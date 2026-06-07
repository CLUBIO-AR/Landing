"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";
import { scrollToSection } from "@/lib/scrollToSection";

type Cycle = "mensual" | "anual";

interface Plan {
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Basic",
    tagline: "Para el 80% del mercado",
    priceMonthly: 28,
    priceAnnual: 235,
    features: [
      "Alumnos ilimitados",
      "1 sucursal · 2 admins",
      "Cuotas automáticas mensuales",
      "Avisos por email",
      "Pago desde el mail sin cuenta (MercadoPago)",
      "Recargos automáticos",
      "Dashboard resumen",
    ],
    cta: "Pedí una demo",
  },
  {
    name: "Plus",
    tagline: "Para maximizar la tasa de cobro",
    priceMonthly: 45,
    priceAnnual: 378,
    features: [
      "Todo lo de Basic",
      "Avisos por WhatsApp (95% apertura)",
      "Confirmación de pago por WA",
      "Branding propio en emails",
      "3 admins",
      "Reportes exportables",
    ],
    cta: "Pedí una demo",
    highlighted: true,
  },
  {
    name: "Multi",
    tagline: "Para cadenas y franquicias",
    priceMonthly: 75,
    priceAnnual: 630,
    features: [
      "Todo lo de Plus",
      "Hasta 5 sucursales",
      "Panel KPIs por sede",
      "Dashboard consolidado",
      "Clases y horarios (próximamente)",
      "Onboarding dedicado",
    ],
    cta: "Consultar",
  },
];

export function Planes() {
  const [cycle, setCycle] = useState<Cycle>("mensual");

  return (
    <section id="planes" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          badge="Planes"
          title="Planes para gimnasios — sin sorpresas"
          subtitle="Sin setup fee. Alumnos ilimitados en todos los planes."
        />

        <div className="flex items-center gap-3">
          <ToggleButton active={cycle === "mensual"} onClick={() => setCycle("mensual")}>
            Mensual
          </ToggleButton>
          <ToggleButton active={cycle === "anual"} onClick={() => setCycle("anual")}>
            Anual
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide bg-green text-dark px-2 py-0.5 rounded-pill">
              2 meses gratis
            </span>
          </ToggleButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const price = cycle === "mensual" ? plan.priceMonthly : plan.priceAnnual;
            const period = cycle === "mensual" ? "/mes" : "/año";

            return (
              <Card
                key={plan.name}
                className={`flex flex-col gap-6 ${
                  plan.highlighted ? "border-green shadow-green-glow" : ""
                }`}
              >
                <div className="flex flex-col gap-2">
                  {plan.highlighted && <Badge>Más popular</Badge>}
                  <h3 className="text-xl font-bold uppercase tracking-wide">{plan.name}</h3>
                  <p className="text-sm text-gray">{plan.tagline}</p>
                </div>

                <div>
                  <span className="text-4xl md:text-5xl font-display font-bold">
                    USD {price}
                  </span>
                  <span className="text-gray text-base">{period}</span>
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-lt">
                      <Check size={16} className="text-green shrink-0 mt-0.5" />
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
            );
          })}
        </div>

        <p className="text-sm text-gray text-center">
          Precios en USD · Facturación en ARS al tipo de cambio del día
        </p>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-5 py-2.5 rounded-pill text-sm font-semibold border transition-colors ${
        active
          ? "bg-green text-dark border-green"
          : "bg-transparent text-gray-lt border-border hover:border-green"
      }`}
    >
      {children}
    </button>
  );
}
