"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  AVISOS_CLUBIO,
  BOT_NUMERO_PROPIO,
  COMISION,
  META_MENSAJE,
  META_MENSAJES_POR_ALUMNO,
  PLANES,
  precioTramo,
  type PlanId,
} from "@/lib/precios";

export type Cobro = "mp" | "mp-instante" | "cresium";
export type WhatsApp = "no" | "avisos" | "bot";

export type ConfigCotizador = {
  gym: string;
  plan: PlanId;
  alumnos: number;
  cuota: number;
  cobro: Cobro;
  wa: WhatsApp;
  pruebas: number;
};

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;
const pct = (n: number) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;
const pesosCentavos = (n: number) => `$${n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const rango = (min: number, max: number) => (Math.round(min) === Math.round(max) ? pesos(min) : `${pesos(min)} a ${pesos(max)}`);

const COBROS: { id: Cobro; titulo: string; detalle: string }[] = [
  { id: "mp", titulo: "Mercado Pago", detalle: "Plata a los 35 días · la comisión más baja del link" },
  { id: "mp-instante", titulo: "Mercado Pago al instante", detalle: "Plata en el momento · comisión más alta" },
  { id: "cresium", titulo: "Cresium", detalle: "Alias propio por alumno · plata al instante" },
];

const WHATSAPP: { id: WhatsApp; titulo: string; detalle: string }[] = [
  { id: "no", titulo: "Sin WhatsApp", detalle: "Avisos y estado de cuenta por email" },
  { id: "avisos", titulo: "Avisos desde el número de CLUBIO", detalle: "Sin trámites · mensajes incluidos" },
  { id: "bot", titulo: "Número propio con bot", detalle: "Avisos + bot de consultas · configuración incluida" },
];

export function Cotizador({ inicial }: { inicial: ConfigCotizador }) {
  const [c, setC] = useState<ConfigCotizador>(inicial);
  const [copiado, setCopiado] = useState(false);
  const set = <K extends keyof ConfigCotizador>(k: K, v: ConfigCotizador[K]) => setC((prev) => ({ ...prev, [k]: v }));

  const r = useMemo(() => {
    const plan = PLANES[c.plan];
    const cobrado = c.alumnos * c.cuota;
    const tasa = c.cobro === "cresium" ? COMISION.cresium : c.cobro === "mp" ? COMISION.mpAl35 : COMISION.mpInstante;
    const comision = cobrado * tasa;

    const precioWa =
      c.wa === "avisos" ? precioTramo(AVISOS_CLUBIO, c.alumnos) : c.wa === "bot" ? precioTramo(BOT_NUMERO_PROPIO, c.alumnos) : 0;
    const waAConsultar = c.wa !== "no" && precioWa === null;

    const clubio = plan.precio + (precioWa ?? 0);
    const metaPruebas = c.wa === "bot" ? c.pruebas * META_MENSAJE : 0;
    const metaMin = c.wa === "bot" ? c.alumnos * META_MENSAJES_POR_ALUMNO.min * META_MENSAJE + metaPruebas : 0;
    const metaMax = c.wa === "bot" ? c.alumnos * META_MENSAJES_POR_ALUMNO.max * META_MENSAJE + metaPruebas : 0;

    const totalMin = clubio + comision + metaMin;
    const totalMax = clubio + comision + metaMax;
    return { plan, cobrado, tasa, comision, precioWa, waAConsultar, clubio, metaMin, metaMax, totalMin, totalMax };
  }, [c]);

  const copiarLink = async () => {
    const p = new URLSearchParams({
      plan: c.plan,
      alumnos: String(c.alumnos),
      cuota: String(c.cuota),
      cobro: c.cobro,
      wa: c.wa,
      ...(c.wa === "bot" && c.pruebas ? { pruebas: String(c.pruebas) } : {}),
      ...(c.gym.trim() ? { gym: c.gym.trim() } : {}),
    });
    const url = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt("Copiá el link:", url);
    }
  };

  const nombreCobro = c.cobro === "cresium" ? "Cresium" : "Mercado Pago";

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-start">
      {/* ── Configuración ── */}
      <div className="flex flex-col gap-6">
        <Bloque titulo="Tu gimnasio">
          <Campo label="Nombre (opcional)">
            <input value={c.gym} onChange={(e) => set("gym", e.target.value)} maxLength={60} placeholder="Ej: BOX CLUB" className={input} />
          </Campo>
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Alumnos que pagan">
              <input type="number" inputMode="numeric" min={1} max={5000} value={c.alumnos || ""}
                onChange={(e) => set("alumnos", clamp(e.target.value, 0, 5000))} className={input} />
            </Campo>
            <Campo label="Cuota promedio ($)">
              <input type="number" inputMode="numeric" min={0} max={10_000_000} step={500} value={c.cuota || ""}
                onChange={(e) => set("cuota", clamp(e.target.value, 0, 10_000_000))} className={input} />
            </Campo>
          </div>
          <p className="text-sm text-gray">Cobrás por mes: <strong className="text-white">{pesos(r.cobrado)}</strong></p>
        </Bloque>

        <Bloque titulo="Plan">
          <Opciones
            valor={c.plan}
            onChange={(v) => set("plan", v)}
            opciones={(Object.keys(PLANES) as PlanId[]).map((id) => ({ id, titulo: `${PLANES[id].nombre} · ${pesos(PLANES[id].precio)}`, detalle: PLANES[id].detalle }))}
          />
        </Bloque>

        <Bloque titulo="¿Cómo te pagan los alumnos?">
          <Opciones valor={c.cobro} onChange={(v) => set("cobro", v)} opciones={COBROS} />
        </Bloque>

        <Bloque titulo="WhatsApp">
          <Opciones valor={c.wa} onChange={(v) => set("wa", v)} opciones={WHATSAPP} />
          {c.wa === "bot" && (
            <Campo label="Clases de prueba por mes (opcional)">
              <input type="number" inputMode="numeric" min={0} max={1000} value={c.pruebas || ""}
                onChange={(e) => set("pruebas", clamp(e.target.value, 0, 1000))} className={input} />
            </Campo>
          )}
        </Bloque>
      </div>

      {/* ── Resultado ── */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-6">
        <div className="bg-[#160B33] text-[#F5F3FC] rounded-card p-6 flex flex-col gap-2">
          <p className="text-sm text-[#B6AAD6]">{c.gym.trim() ? `Total estimado por mes para ${c.gym.trim()}` : "Total estimado por mes"}</p>
          <p className="font-display text-4xl sm:text-5xl text-lime">{rango(r.totalMin, r.totalMax)}</p>
          <p className="text-sm text-[#B6AAD6]">
            {r.cobrado > 0 ? `${pct(r.totalMin / r.cobrado)}${r.totalMax !== r.totalMin ? ` a ${pct(r.totalMax / r.cobrado)}` : ""} de lo que cobrás. ` : ""}
            El abono de CLUBIO es + IVA.
          </p>
          {r.waAConsultar && (
            <p className="text-sm bg-lime text-lime-text rounded-btn px-3 py-2 mt-1">
              Con más de 400 alumnos, el precio de WhatsApp es a consultar: no está sumado.
            </p>
          )}
        </div>

        <p className="font-display text-lg text-white mt-2">A quién le pagás cada parte</p>

        <Pago
          a="A CLUBIO"
          como="Abono mensual. Te lo facturamos nosotros."
          monto={`${pesos(r.clubio)} + IVA`}
          lineas={[
            [`Plan ${r.plan.nombre}`, pesos(r.plan.precio)],
            ...(c.wa === "avisos" ? [["WhatsApp: avisos desde el número de CLUBIO (mensajes incluidos)", r.precioWa === null ? "a consultar" : pesos(r.precioWa)] as [string, string]] : []),
            ...(c.wa === "bot" ? [["WhatsApp con bot y número propio", r.precioWa === null ? "a consultar" : pesos(r.precioWa)] as [string, string]] : []),
          ]}
        />

        <Pago
          a={`A ${nombreCobro}`}
          como={`Comisión por cada cobro. ${nombreCobro} la descuenta sola de cada pago: no te llega una factura aparte.`}
          monto={pesos(r.comision)}
          lineas={[
            [`${pct(r.tasa)} de ${pesos(r.cobrado)} (IVA incluido)`, pesos(r.comision)],
            [
              "Te queda en tu cuenta",
              `${pesos(r.cobrado - r.comision)}${c.cobro === "mp" ? " · a los 35 días" : " · al instante"}`,
            ],
          ]}
        />

        {c.wa === "bot" && (
          <Pago
            a="A Meta (WhatsApp)"
            como="Los avisos que manda tu número. Se cobran a la tarjeta que cargues en tu cuenta de WhatsApp Business."
            monto={rango(r.metaMin, r.metaMax)}
            lineas={[
              [`${META_MENSAJES_POR_ALUMNO.min} a ${META_MENSAJES_POR_ALUMNO.max} avisos por alumno × ${pesosCentavos(META_MENSAJE)}`, rango(r.metaMin - c.pruebas * META_MENSAJE, r.metaMax - c.pruebas * META_MENSAJE)],
              ...(c.pruebas ? [[`Recordatorios de ${c.pruebas} clases de prueba`, pesos(c.pruebas * META_MENSAJE)] as [string, string]] : []),
              ["Respuestas del bot", "gratis"],
            ]}
          />
        )}

        <div className="bg-card border border-border rounded-card p-5 flex flex-col gap-3">
          <p className="font-display text-base text-white">Qué incluye</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-lt">
            <Item>Cuotas y recargos automáticos, alumnos ilimitados ({r.plan.detalle.toLowerCase()})</Item>
            <Item>Avisos y estado de cuenta por email, panel de pagos</Item>
            {c.cobro === "cresium" ? (
              <Item>Un alias propio para cada alumno: cada transferencia se imputa sola, con pagos parciales y saldo a favor</Item>
            ) : (
              <Item>Link de pago de Mercado Pago en cada aviso: el alumno paga con un clic y la cuota se marca sola</Item>
            )}
            {c.wa === "avisos" && <Item>Hasta 3 avisos por cuota por WhatsApp desde el número de CLUBIO; la confirmación de pago va por email</Item>}
            {c.wa === "bot" && (
              <>
                <Item>Configuración de tu número de WhatsApp Business, hecha por CLUBIO</Item>
                <Item>Hasta 3 avisos por cuota y confirmación de pago por WhatsApp</Item>
                <Item>Bot: horarios, precios, clases de prueba, estado de cuenta con DNI y comprobantes</Item>
                <Item>Todos los chats en el panel, con aviso cuando hace falta una persona</Item>
              </>
            )}
          </ul>
        </div>

        <button type="button" onClick={copiarLink}
          className="inline-flex items-center justify-center gap-2 rounded-btn border border-border bg-card px-4 py-3 text-sm font-bold text-white hover:border-green transition-colors">
          {copiado ? <Check className="w-4 h-4 text-green" /> : <Copy className="w-4 h-4" />}
          {copiado ? "¡Link copiado!" : "Copiar link de esta cotización"}
        </button>

        <p className="text-xs text-gray leading-relaxed">
          Estimación. Tarifas de Mercado Pago para link de pago (1,49% + IVA a 35 días; 6,29% + IVA al instante) y de
          Cresium (1% + IVA), octubre 2026. Meta: {pesosCentavos(META_MENSAJE)} por aviso con IVA; entre {META_MENSAJES_POR_ALUMNO.min} y{" "}
          {META_MENSAJES_POR_ALUMNO.max} avisos pagos por alumno por mes. Hasta 3 avisos por cuota: 3 días antes, el día del
          vencimiento y 3 días después. Las tarifas de terceros pueden cambiar.
        </p>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-btn border border-border bg-card px-3 py-2.5 text-white outline-none focus:border-green transition-colors";

function clamp(v: string, min: number, max: number): number {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0;
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-card p-5 flex flex-col gap-4">
      <h2 className="font-display text-base text-white">{titulo}</h2>
      {children}
    </section>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-gray-lt">
      {label}
      {children}
    </label>
  );
}

function Opciones<T extends string>({ valor, onChange, opciones }: {
  valor: T;
  onChange: (v: T) => void;
  opciones: { id: T; titulo: string; detalle: string }[];
}) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {opciones.map((o) => {
        const activo = o.id === valor;
        return (
          <button key={o.id} type="button" role="radio" aria-checked={activo} onClick={() => onChange(o.id)}
            className={`text-left rounded-btn border px-4 py-3 transition-colors ${activo ? "border-green bg-[#F1EBFE]" : "border-border hover:border-gray"}`}>
            <span className="flex items-center gap-2 font-bold text-white">
              <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${activo ? "border-green bg-green" : "border-gray"}`} aria-hidden="true" />
              {o.titulo}
            </span>
            <span className="block text-sm text-gray pl-6">{o.detalle}</span>
          </button>
        );
      })}
    </div>
  );
}

function Pago({ a, como, monto, lineas }: { a: string; como: string; monto: string; lineas: [string, string][] }) {
  return (
    <div className="bg-card border border-border rounded-card p-5 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <p className="font-display text-base text-white">{a}</p>
        <p className="font-bold text-lg text-white">{monto}</p>
      </div>
      <p className="text-sm text-gray">{como}</p>
      <dl className="flex flex-col gap-1.5 text-sm border-t border-border pt-3">
        {lineas.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-gray-lt">{k}</dt>
            <dd className="text-white font-bold text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="w-4 h-4 text-green shrink-0 mt-0.5" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
