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

const WHATSAPP_FEATURES = [
  "Avisos de cuota con link de pago o alias",
  "Estado de cuenta para cada alumno",
  "Bot de consultas y clase de prueba",
  "Desde el número de WhatsApp de tu negocio",
];

export function Planes() {
  return (
    <section id="planes" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          title="Planes"
          subtitle="Sin setup fee y sin contrato. Te pasamos el precio para tu caso en la demo."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
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

          <div className="flex flex-col gap-6 rounded-card bg-green p-7 text-on-ink">
            <div className="flex flex-col gap-2">
              <MessageCircle size={28} className="text-lime" aria-hidden="true" />
              <h3 className="font-display text-3xl">Módulo WhatsApp</h3>
              <p className="text-base text-on-ink/80">Se suma a cualquier plan.</p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {WHATSAPP_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-base">
                  <Check size={18} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className="inline-flex w-full items-center justify-center rounded-btn bg-lime px-6 py-3 font-semibold text-lime-text transition-colors hover:bg-[#c6f01f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Consultar precio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
