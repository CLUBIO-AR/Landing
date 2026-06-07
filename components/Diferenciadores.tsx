import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";

const ITEMS = [
  {
    number: "01",
    title: "El alumno paga sin registrarse en nada",
    badge: "Único en el mercado",
    description:
      "La competencia requiere que el socio se suscriba a MercadoPago o cree una cuenta. CLUBIO manda un link y el alumno paga con lo que ya tiene. Cero fricción.",
  },
  {
    number: "02",
    title: "WhatsApp con 95% de tasa de apertura",
    badge: "95% de apertura",
    description:
      "El email llega al 25% de los alumnos. El WhatsApp lo abre casi todo el mundo. El gym conecta su propio número, sin costos adicionales para CLUBIO.",
  },
  {
    number: "03",
    title: "Alumnos ilimitados en todos los planes",
    badge: "Sin topes",
    description:
      "GymSmartAccess limita a 100-300 socios por plan. CLUBIO nunca cobra por cantidad de alumnos. El gym crece sin penalidad.",
  },
];

export function Diferenciadores() {
  return (
    <section id="diferenciadores" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading badge="Por qué CLUBIO" title="Tres cosas que ningún otro hace igual." />

        <div className="flex flex-col gap-6">
          {ITEMS.map((item) => (
            <Card key={item.number} className="flex flex-col md:flex-row md:items-center gap-6">
              <span className="text-4xl font-display font-bold text-green-lt md:w-20 shrink-0">
                {item.number}
              </span>
              <div className="flex flex-col gap-3">
                <div>
                  <Badge>{item.badge}</Badge>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-base text-gray leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
