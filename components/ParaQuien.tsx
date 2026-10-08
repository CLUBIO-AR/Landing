import { Dumbbell, Footprints, Music, Users } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

const PERFILES = [
  {
    icon: Dumbbell,
    title: "Gimnasios y boxes",
    text: "Musculación, funcional, crossfit. Desde 30 alumnos hasta varias sedes.",
  },
  {
    icon: Footprints,
    title: "Profes y entrenadores",
    text: "Si trabajás por tu cuenta y le cobrás todos los meses a tus alumnos.",
  },
  {
    icon: Music,
    title: "Escuelas y academias",
    text: "Danza, artes marciales, natación, música, idiomas: cualquier actividad con cuota.",
  },
  {
    icon: Users,
    title: "Clubes",
    text: "Cuota social o por actividad, con varias disciplinas en el mismo lugar.",
  },
];

export function ParaQuien() {
  return (
    <section id="para-quien" className="bg-ink text-on-ink py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          inverted
          title="¿Para quién es?"
          subtitle="Para cualquiera que todos los meses le tenga que cobrar a sus alumnos."
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-on-ink/15">
          {PERFILES.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={`flex gap-5 py-8 border-b border-on-ink/15 ${
                i % 2 === 0 ? "md:pr-10 md:border-r" : "md:pl-10"
              }`}
            >
              <Icon size={28} className="shrink-0 text-lime mt-1" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="text-base text-on-ink/70 leading-relaxed max-w-md">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
