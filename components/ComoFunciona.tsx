import { SectionHeading } from "./ui/SectionHeading";

const STEPS = [
  {
    title: "Se genera la cuota",
    description: "Todos los meses, sola, para cada alumno.",
  },
  {
    title: "Le llega el aviso",
    description: "Por WhatsApp o email antes del vencimiento, con el botón para pagar.",
  },
  {
    title: "Paga como prefiera",
    description: "Con MercadoPago en un toque, sin crear cuenta. O por transferencia, como siempre.",
  },
  {
    title: "Vos ya cobraste",
    description: "El pago queda registrado y lo ves al instante en tu panel.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          title="Cómo funciona"
          subtitle="Lo configurás una vez. Después se hace solo, todos los meses."
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 border-t-4 border-green pt-5">
              <span className="font-display text-5xl text-green leading-none">{index + 1}</span>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="text-base text-gray-lt leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="text-base text-gray-lt max-w-2xl">
          Si alguien no paga, el sistema aplica el recargo que configuraste y le sigue avisando. Si te
          pagan por transferencia o en efectivo, lo registrás en un click y queda todo al día.
        </p>
      </div>
    </section>
  );
}
