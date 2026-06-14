"use client";

import { Check } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { scrollToSection } from "@/lib/scrollToSection";

const PILLS = ["Sin setup fee", "Sin contrato", "Alumnos ilimitados"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative bg-dark overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-card opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start gap-6">
          <Badge>Gestión de gimnasios · Argentina</Badge>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            Tus cuotas
            <br />
            se cobran solas.
          </h1>

          <p className="text-base md:text-lg text-gray leading-relaxed max-w-lg">
            CLUBIO es el sistema de gestión para gimnasios que carga tus alumnos,
            conecta con MercadoPago y hace el resto. Sin perseguir morosos.
            Sin planillas. Sin olvidarse de nadie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => scrollToSection("demo")}>
              Pedí una demo →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("como-funciona")}
            >
              Ver cómo funciona
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-card border border-border text-sm text-gray-lt"
              >
                <Check size={14} className="text-green" />
                {pill}
              </span>
            ))}
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="hidden lg:block relative">
      <div className="bg-card border border-border rounded-card shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-gray-lt">Dashboard</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            En vivo
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <KpiCard label="Socios" value="26" />
          <KpiCard label="Deudores" value="5" accent />
          <KpiCard label="Cobrado" value="$267.500" />
        </div>

        <div className="mt-6 space-y-3">
          {[
            { name: "Martina G.", status: "Pagado", ok: true },
            { name: "Lucas P.", status: "Pendiente", ok: false },
            { name: "Sofía R.", status: "Pagado", ok: true },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between bg-dark border border-border rounded-btn px-4 py-3"
            >
              <span className="text-sm text-gray-lt">{row.name}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-pill ${
                  row.ok ? "bg-green/15 text-green-lt" : "bg-border text-gray"
                }`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-dark border border-border rounded-btn p-4">
      <p className="text-xs text-gray uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-xl font-display font-bold ${accent ? "text-green-lt" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
