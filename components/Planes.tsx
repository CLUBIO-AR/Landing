"use client";

import { Check, Clock } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";
import { scrollToSection } from "@/lib/scrollToSection";

interface Plan {
  name: string;
  tagline: string;
  price: number | null;
  features: string[];
  cta: string;
  highlighted?: boolean;
  comingSoon?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Basic",
    tagline: "Para el gym que quiere empezar a cobrar sin complicaciones",
    price: 28,
    features: [
      "Alumnos ilimitados",
      "1 sede · Hasta 3 admins",
      "Cobros automáticos + MercadoPago",
      "Avisos por email con branding",
      "Reportes y exportación CSV",
      "Sin setup fee",
    ],
    cta: "Solicitar demo",
  },
  {
    name: "Multi",
    tagline: "Para cadenas y gyms con varias sedes o equipo grande",
    price: 75,
    features: [
      "Alumnos ilimitados",
      "Hasta 5 sedes · Hasta 10 admins",
      "Cobros automáticos + MercadoPago",
      "Avisos por email con branding",
      "Reportes y exportación CSV",
      "Reportes cross-sede",
      "Sin setup fee",
    ],
    cta: "Solicitar demo",
    highlighted: true,
  },
  {
    name: "Pro",
    tagline: "Portal del alumno, clases, profesores y más",
    price: null,
    features: [
      "Alumnos ilimitados",
      "Portal del alumno",
      "Clases y horarios",
      "Gestión de profesores",
      "Add-on WhatsApp incluido",
      "Sin setup fee",
    ],
    cta: "Avisame cuando esté disponible",
    comingSoon: true,
  },
];

export function Planes() {
  return (
    <section id="planes" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          badge="Planes"
          title="Planes para gimnasios — sin sorpresas"
          subtitle="Sin setup fee. Alumnos ilimitados en todos los planes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col gap-6 ${
                plan.highlighted ? "border-green shadow-green-glow" : ""
              } ${plan.comingSoon ? "opacity-60" : ""}`}
            >
              <div className="flex flex-col gap-2">
                {plan.highlighted && <Badge>Más elegido</Badge>}
                {plan.comingSoon && <Badge variant="gray">Próximamente</Badge>}
                <h3 className="text-xl font-bold uppercase tracking-wide">{plan.name}</h3>
                <p className="text-sm text-gray">{plan.tagline}</p>
              </div>

              <div>
                {plan.price !== null ? (
                  <>
                    <span className="text-4xl md:text-5xl font-display font-bold">
                      USD {plan.price}
                    </span>
                    <span className="text-gray text-base">/mes</span>
                  </>
                ) : (
                  <span className="text-4xl md:text-5xl font-display font-bold text-gray">—</span>
                )}
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-lt">
                    {plan.comingSoon ? (
                      <Clock size={16} className="text-gray shrink-0 mt-0.5" />
                    ) : (
                      <Check size={16} className="text-green shrink-0 mt-0.5" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "primary" : "outline"}
                className="w-full justify-center"
                onClick={() => scrollToSection("demo")}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="border border-border rounded-card bg-card px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg font-bold text-white">+ Add-on WhatsApp</span>
            <span className="text-green font-semibold">USD 8/mes</span>
          </div>
          <p className="text-sm text-gray leading-relaxed">
            Disponible en todos los planes. CLUBIO envía los avisos de cuota directamente por
            WhatsApp. El gym no necesita configurar nada.
          </p>
        </div>

        <p className="text-sm text-gray text-center">
          Precios en USD · Facturación en ARS al tipo de cambio del día
        </p>
      </div>
    </section>
  );
}
