import { ClipboardList, BarChart3, Banknote } from "lucide-react";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";

const PROBLEMS = [
  {
    icon: ClipboardList,
    title: "Excel + WhatsApp",
    description:
      "Recordatorios manuales uno por uno. Horas perdidas. Alumnos que se olvidan.",
  },
  {
    icon: BarChart3,
    title: "Sin visibilidad real",
    description:
      "No sabés cuántos deben hasta que te sentás a revisar. Una vez al mes. La deuda crece sola.",
  },
  {
    icon: Banknote,
    title: "Cobro con fricción",
    description:
      "Transferencias sin confirmar. Efectivo sin registrar. Plata que se pierde en el camino.",
  },
];

export function Problema() {
  return (
    <section id="problema" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading badge="El problema" title="¿Cuánto perdés por mes sin saberlo?" />

        <div className="flex flex-col gap-2">
          <p className="text-4xl md:text-5xl font-display font-bold text-green">
            $720.000 – $1.080.000 ARS
          </p>
          <p className="text-sm md:text-base text-gray">
            perdidos por mes en un gimnasio de 150 alumnos solo por morosidad evitable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col gap-4">
              <div className="w-11 h-11 rounded-btn bg-dark border border-border flex items-center justify-center">
                <Icon size={22} className="text-green" />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-base text-gray leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
