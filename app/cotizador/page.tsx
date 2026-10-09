import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { Cotizador, type Cobro, type ConfigCotizador, type WhatsApp } from "@/components/Cotizador";
import type { PlanId } from "@/lib/precios";

// Página oculta: no está enlazada en la landing ni en el sitemap, y no se indexa.
// Se comparte por link (el botón "Copiar link" arma la URL con la cotización).
export const metadata: Metadata = {
  title: "Cotizador",
  description: "Armá cuánto te cuesta CLUBIO por mes según tus alumnos, cómo cobrás y WhatsApp.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

type Params = Record<string, string | string[] | undefined>;

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const entero = (v: string, def: number, max: number) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : def;
};
function elegir<T extends string>(v: string, validos: readonly T[], def: T): T {
  return (validos as readonly string[]).includes(v) ? (v as T) : def;
}

export default async function CotizadorPage({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  const inicial: ConfigCotizador = {
    gym: uno(sp.gym).slice(0, 60),
    plan: elegir<PlanId>(uno(sp.plan), ["basic", "multi"], "basic"),
    alumnos: entero(uno(sp.alumnos), 100, 5000),
    cuota: entero(uno(sp.cuota), 45_000, 10_000_000),
    cobro: elegir<Cobro>(uno(sp.cobro), ["mp", "mp-instante", "cresium"], "cresium"),
    wa: elegir<WhatsApp>(uno(sp.wa), ["no", "avisos", "bot"], "bot"),
    pruebas: entero(uno(sp.pruebas), 0, 1000),
  };

  return (
    <main className="bg-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <Logo size="sm" />
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl sm:text-4xl text-white">Cotizador</h1>
            <p className="text-gray-lt max-w-2xl">
              Elegí cómo querés usar CLUBIO y mirá cuánto te queda por mes, y a quién le pagás cada parte. Precios en
              pesos.
            </p>
          </div>
        </header>
        <Cotizador inicial={inicial} />
      </div>
    </main>
  );
}
