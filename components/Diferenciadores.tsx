import { ArrowLeftRight, HandCoins, Infinity as InfinityIcon, LifeBuoy, Smartphone } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

const ITEMS = [
  {
    icon: ArrowLeftRight,
    title: "MercadoPago o transferencia, como prefieras",
    description:
      "Tus alumnos pueden pagar con MercadoPago desde el aviso, o seguir transfiriéndote como siempre. Las transferencias las registrás en un click y todo queda en el mismo lugar.",
  },
  {
    icon: Smartphone,
    title: "Tus alumnos no tienen que crear nada",
    description:
      "Ni apps, ni cuentas, ni contraseñas. Reciben el mensaje y pagan con lo que ya usan.",
  },
  {
    icon: HandCoins,
    title: "La plata va directo a tu cuenta",
    description:
      "Cobrás en tu propio MercadoPago o en tu cuenta bancaria. CLUBIO nunca toca tu dinero.",
  },
  {
    icon: InfinityIcon,
    title: "Alumnos ilimitados",
    description: "No pagás más porque tu negocio crezca, tengas 20 alumnos o 500.",
  },
  {
    icon: LifeBuoy,
    title: "Te ayudamos a arrancar",
    description:
      "Te armamos la cuenta, te acompañamos a conectar MercadoPago y a cargar tus alumnos.",
  },
];

export function Diferenciadores() {
  return (
    <section id="por-que" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading title="Por qué CLUBIO" />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {ITEMS.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className={`flex flex-col gap-3 ${
                i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2 rounded-card bg-lime p-7 text-lime-text" : ""
              }`}
            >
              <Icon size={i === 0 ? 34 : 26} className={i === 0 ? "text-lime-text" : "text-green"} aria-hidden="true" />
              <h3 className={`font-display leading-tight ${i === 0 ? "text-3xl" : "text-xl"}`}>{title}</h3>
              <p className={`leading-relaxed ${i === 0 ? "text-lg" : "text-base text-gray-lt"}`}>
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
