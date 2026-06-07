import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Cuota generada",
    description: "automática el 1ro de cada mes",
  },
  {
    number: "02",
    title: "Aviso enviado",
    description: "email o WhatsApp antes del vencimiento",
  },
  {
    number: "03",
    title: "Alumno paga",
    description: "click en el mensaje, sin crear cuenta",
  },
  {
    number: "04",
    title: "Vos cobraste",
    description: "dashboard actualizado en tiempo real",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          badge="La solución"
          title="Configurás en 15 minutos. Después no tocás nada."
        />

        <div className="flex flex-col md:flex-row md:items-stretch gap-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex-1 flex flex-col md:flex-row items-stretch gap-4">
              <div className="flex-1 bg-card border border-border rounded-card p-6 flex flex-col gap-2">
                <span className="text-sm font-display font-bold text-green-lt">{step.number}</span>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{step.description}</p>
              </div>
              {index < STEPS.length - 1 && (
                <ArrowRight size={20} className="self-center shrink-0 text-green rotate-90 md:rotate-0" />
              )}
            </div>
          ))}
        </div>

        <p className="text-sm md:text-base text-gray-lt text-center max-w-2xl mx-auto">
          Si no paga, el sistema aplica el recargo configurado y sigue avisando.
          Sin que vos hagas nada.
        </p>
      </div>
    </section>
  );
}
