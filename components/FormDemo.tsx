"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

const CLUBIO_API_URL = process.env.NEXT_PUBLIC_CLUBIO_API_URL || "https://app.clubio.com.ar";

const ALUMNOS_OPTIONS = ["<50", "50-100", "100-200", "200+"];
const RUBRO_OPTIONS = ["Gimnasio o box", "Profe o entrenador/a", "Escuela o academia", "Club", "Otro"];
const ORIGEN_OPTIONS = ["Instagram", "Recomendación", "Google", "Otro"];
const PHONE_PATTERN = /^[+\d][\d\s\-()+.]*$/;

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  gym: string;
  rubro: string;
  alumnos: string;
  origen: string;
  website: string; // honeypot — debe quedar vacío
}

const EMPTY_VALUES: FormValues = {
  nombre: "",
  email: "",
  telefono: "",
  gym: "",
  rubro: "",
  alumnos: "",
  origen: "",
  website: "",
};

const REQUIRED_FIELDS: Array<keyof FormValues> = ["nombre", "email", "telefono", "gym", "rubro"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "succeeded" | "error";

export function FormDemo() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [state, setState] = useState<SubmitState>("idle");
  const [clientError, setClientError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (state === "error") setState("idle");
  };

  const validate = (): string | null => {
    for (const field of REQUIRED_FIELDS) {
      if (!values[field].trim()) {
        return "Completá todos los campos obligatorios.";
      }
    }
    if (values.nombre.length > 100 || values.gym.length > 100) {
      return "El nombre o el de tu negocio superan el máximo de 100 caracteres.";
    }
    if (!EMAIL_PATTERN.test(values.email) || values.email.length > 254) {
      return "Ingresá un email válido.";
    }
    const phoneDigits = values.telefono.replace(/\D/g, "");
    if (phoneDigits.length < 6 || !PHONE_PATTERN.test(values.telefono.trim())) {
      return "Ingresá un teléfono válido (ej: +54 9 11 1234-5678).";
    }
    return null;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    // honeypot: bots rellenan el campo oculto "website", usuarios reales no
    if (values.website) {
      setState("succeeded");
      return;
    }

    const validationMessage = validate();
    if (validationMessage) {
      setClientError(validationMessage);
      return;
    }
    setClientError(null);
    submittingRef.current = true;
    setState("submitting");

    try {
      const res = await fetch(`${CLUBIO_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          telefono: values.telefono,
          // La API de leads todavía no tiene campo "rubro": viaja dentro de gym_nombre.
          gym_nombre: `${values.gym.trim()} (${values.rubro})`,
          cantidad_alumnos: values.alumnos || undefined,
          como_nos_conocio: values.origen || undefined,
        }),
      });

      if (!res.ok) {
        setState("error");
        return;
      }

      setState("succeeded");
    } catch {
      setState("error");
    } finally {
      submittingRef.current = false;
    }
  };

  if (state === "succeeded") {
    return (
      <FormSection>
        <div className="bg-card border border-green/40 rounded-card p-8 text-center max-w-xl mx-auto">
          <p className="text-lg font-semibold text-green-lt">
            Listo, recibimos tu pedido. Te escribimos por WhatsApp dentro de las 24 horas.
          </p>
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection>
      <form
        onSubmit={onSubmit}
        className="bg-card border border-border rounded-card p-6 md:p-8 flex flex-col gap-5 max-w-xl mx-auto w-full"
      >
        {/* honeypot: invisible para usuarios reales, bots lo completan */}
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={handleChange}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        />

        <Field label="Nombre completo" required>
          <input
            type="text"
            name="nombre"
            required
            maxLength={100}
            value={values.nombre}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            value={values.email}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Teléfono / WhatsApp" required>
          <input
            type="tel"
            name="telefono"
            required
            maxLength={20}
            value={values.telefono}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="¿A qué te dedicás?" required>
          <select name="rubro" required value={values.rubro} onChange={handleChange} className={inputClass}>
            <option value="">Seleccioná una opción</option>
            {RUBRO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Nombre de tu gym, estudio o escuela (o el tuyo si trabajás solo/a)" required>
          <input
            type="text"
            name="gym"
            required
            maxLength={100}
            value={values.gym}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Cantidad aproximada de alumnos">
          <select name="alumnos" value={values.alumnos} onChange={handleChange} className={inputClass}>
            <option value="">Seleccioná una opción</option>
            {ALUMNOS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="¿Cómo nos conociste?">
          <select name="origen" value={values.origen} onChange={handleChange} className={inputClass}>
            <option value="">Seleccioná una opción</option>
            {ORIGEN_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        {clientError && <p className={errorClass}>{clientError}</p>}
        {state === "error" && (
          <p className={errorClass}>
            Algo salió mal. Escribinos a contacto@clubio.com.ar
          </p>
        )}

        <Button type="submit" size="lg" disabled={state === "submitting"} className="w-full justify-center">
          {state === "submitting" ? "Enviando..." : "Pedir demo"}
        </Button>

        <p className="text-sm text-gray text-center">
          Te respondemos dentro de las 24 horas a tu WhatsApp.
        </p>
      </form>
    </FormSection>
  );
}

function FormSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="demo" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 items-center">
        <SectionHeading
          align="center"
          title="Pedí tu demo gratis"
          subtitle="Te mostramos CLUBIO funcionando en 30 minutos y te pasamos el precio para tu caso. Sin compromiso."
        />
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-lt">
        {label}
        {required && <span className="text-green"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "bg-dark border border-border rounded-btn px-4 py-2.5 text-sm text-white placeholder:text-gray focus:outline-none focus:border-green focus:ring-2 focus:ring-green/30 transition-colors";

const errorClass = "text-sm text-red-400";
