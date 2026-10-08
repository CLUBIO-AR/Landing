import { X } from "lucide-react";

const DOLORES = [
  "Mandás recordatorios por WhatsApp uno por uno, todos los meses.",
  "Te llegan transferencias y no sabés de quién son.",
  "El Excel nunca está al día y no sabés quién debe hasta fin de mes.",
  "Te da incomodidad tener que reclamarle la cuota a un alumno.",
];

export function Problema() {
  return (
    <section id="problema" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-4xl md:text-5xl leading-tight">¿Te suena?</h2>
          <p className="text-lg text-gray-lt leading-relaxed max-w-sm">
            Cobrar cuotas a mano te come horas que podrías estar dando clase.
          </p>
        </div>

        <div className="flex flex-col">
          <ul className="flex flex-col">
            {DOLORES.map((dolor) => (
              <li
                key={dolor}
                className="flex items-start gap-4 py-5 border-b border-border text-lg md:text-xl text-white"
              >
                <X size={22} className="shrink-0 mt-1 text-green" aria-hidden="true" />
                {dolor}
              </li>
            ))}
          </ul>
          <p className="pt-6 text-lg md:text-xl font-bold text-white">
            CLUBIO se encarga de todo eso por vos.
          </p>
        </div>
      </div>
    </section>
  );
}
