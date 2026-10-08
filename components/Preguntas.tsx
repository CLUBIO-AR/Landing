import { Plus } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

const FAQ = [
  {
    q: "¿Mis alumnos tienen que descargar una app o crear una cuenta?",
    a: "No. Les llega un mensaje por WhatsApp o email con el link de pago, y pagan con MercadoPago sin registrarse en nada. Si cobrás por transferencia, el mensaje trae tu alias.",
  },
  {
    q: "¿Puedo seguir cobrando por transferencia?",
    a: "Sí. Tus alumnos pueden pagar con MercadoPago o seguir transfiriéndote como siempre. Cuando te llega una transferencia o un pago en efectivo, lo registrás en un click y la cuota queda al día.",
  },
  {
    q: "¿La plata pasa por CLUBIO?",
    a: "No. Los pagos van directo a tu cuenta de MercadoPago o a tu cuenta bancaria. CLUBIO solo registra que se pagó.",
  },
  {
    q: "¿Sirve si soy profe y trabajo solo?",
    a: "Sí. CLUBIO sirve para cualquiera que cobre una cuota todos los meses, tengas 15 alumnos o 500.",
  },
  {
    q: "¿Por qué no veo los precios?",
    a: "Depende de cuántas sedes tengas y si sumás el módulo de WhatsApp. En la demo te pasamos el precio exacto para tu caso. No hay setup fee ni contrato.",
  },
  {
    q: "¿Cuánto tardo en empezar?",
    a: "Te armamos la cuenta nosotros. Después cargás tus alumnos, conectás MercadoPago si lo vas a usar, y desde ese mes las cuotas se generan y se avisan solas.",
  },
];

export function Preguntas() {
  return (
    <section id="preguntas" className="bg-darker py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading title="Preguntas frecuentes" />

        <div className="flex flex-col border-t border-border">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-green [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-green transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-6 pr-10 text-base text-gray-lt leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
