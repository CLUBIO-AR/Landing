import { Check, MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

// Los precios NO se muestran en la landing (decisión oct 2026): se pasan en la demo.
// Los valores vigentes están en AGENTS.md. El plan Pro está oculto hasta su lanzamiento.
interface Plan {
  name: string;
  tagline: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: "Basic",
    tagline: "Para una sede: gyms, estudios, escuelas y profes.",
    features: [
      "Alumnos ilimitados",
      "1 sede y hasta 3 administradores",
      "Cuotas y recargos automáticos",
      "Cobro con MercadoPago o transferencia",
      "Avisos por email con tu logo",
      "Reportes y exportación a Excel",
    ],
  },
  {
    name: "Multi",
    tagline: "Para cadenas o negocios con varias sedes y equipo grande.",
    features: [
      "Todo lo del plan Basic",
      "Hasta 5 sedes y 10 administradores",
      "Reportes por sede y consolidados",
    ],
  },
];

// Dos formas de sumar WhatsApp. Sin precios (se pasan en la demo). No nombrar al
// proveedor de cobros: puede cambiar. Lo de Meta sí se aclara, porque lo paga el negocio.
const WHATSAPP_OPCIONES = [
  {
    nombre: "Avisos por WhatsApp",
    tagline: "Desde el número de CLUBIO. Sin trámites: lo activás y listo.",
    features: [
      "Hasta 3 avisos por cuota: antes, el día del vencimiento y después",
      "Cada aviso con el link de pago o el alias para transferir",
      "Los mensajes ya están incluidos en el precio",
    ],
    nota: "Ideal si querés avisar por WhatsApp sin configurar nada.",
  },
  {
    nombre: "WhatsApp con bot",
    tagline: "Desde el número de tu negocio. Lo configuramos nosotros.",
    features: [
      "Los mismos avisos, más la confirmación cuando pagan",
      "Bot que responde horarios, precios y reserva clases de prueba",
      "Estado de cuenta: el alumno pregunta cuánto debe y le llega al instante",
      "Recibe comprobantes de transferencia para que los revises",
      "Todos los chats en tu panel, con aviso solo cuando hace falta una persona",
    ],
    nota: "Los avisos que manda tu número los cobra Meta (Facebook) aparte, a la tarjeta de tu cuenta de WhatsApp Business. Las respuestas del bot son gratis.",
  },
];

export function Planes() {
  return (
    <section id="planes" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          title="Planes"
          subtitle="Sin setup fee y sin contrato. Te pasamos el precio para tu caso en la demo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col gap-6 rounded-card border border-border bg-card p-7"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-3xl">{plan.name}</h3>
                <p className="text-base text-gray-lt">{plan.tagline}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-base text-white">
                    <Check size={18} className="text-green shrink-0 mt-0.5" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full justify-center" href="#demo">
                Consultar precio
              </Button>
            </div>
          ))}

        </div>

        <div id="whatsapp" className="flex flex-col gap-6 rounded-card bg-green p-6 sm:p-8 text-on-ink scroll-mt-24">
          <div className="flex flex-col gap-2 max-w-2xl">
            <MessageCircle size={28} className="text-lime" aria-hidden="true" />
            <h3 className="font-display text-3xl">Sumá WhatsApp a cualquier plan</h3>
            <p className="text-base text-on-ink/80">Elegí cómo: solo avisos, o avisos más un bot que atiende por vos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHATSAPP_OPCIONES.map((op) => (
              <div key={op.nombre} className="flex flex-col gap-4 rounded-card bg-on-ink/10 border border-on-ink/20 p-6">
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-2xl">{op.nombre}</h4>
                  <p className="text-base text-on-ink/80">{op.tagline}</p>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {op.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-base">
                      <Check size={18} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-on-ink/80 border-t border-on-ink/20 pt-3">{op.nota}</p>
              </div>
            ))}
          </div>

          <a
            href="#demo"
            className="inline-flex w-full sm:w-auto sm:self-start items-center justify-center rounded-btn bg-lime px-6 py-3 font-semibold text-lime-text transition-colors hover:bg-[#c6f01f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Consultar precio
          </a>
        </div>
      </div>
    </section>
  );
}
