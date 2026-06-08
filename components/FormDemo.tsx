"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

// OJO: usar "www" — "clubio.com.ar" (apex) hace un 307 a "www" y los navegadores
// bloquean los preflights de CORS que reciben un redirect.
const CLUBIO_API_URL = process.env.NEXT_PUBLIC_CLUBIO_API_URL ?? "https://www.clubio.com.ar";

const ALUMNOS_OPTIONS = ["<50", "50-100", "100-200", "200+"];
const ORIGEN_OPTIONS = ["Instagram", "Recomendación", "Google", "Otro"];

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  gym: string;
  alumnos: string;
  origen: string;
}

const EMPTY_VALUES: FormValues = {
  nombre: "",
  email: "",
  telefono: "",
  gym: "",
  alumnos: "",
  origen: "",
};

const REQUIRED_FIELDS: Array<keyof FormValues> = ["nombre", "email", "telefono", "gym"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "succeeded" | "error";

export function FormDemo() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [state, setState] = useState<SubmitState>("idle");
  const [clientError, setClientError] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    for (const field of REQUIRED_FIELDS) {
      if (!values[field].trim()) {
        return "Completá todos los campos obligatorios.";
      }
    }
    if (!EMAIL_PATTERN.test(values.email)) {
      return "Ingresá un email válido.";
    }
    return null;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setClientError(validationMessage);
      return;
    }
    setClientError(null);
    setState("submitting");

    try {
      const res = await fetch(`${CLUBIO_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          telefono: values.telefono,
          gym_nombre: values.gym || undefined,
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
    }
  };

  if (state === "succeeded") {
    return (
      <FormSection>
        <div className="bg-card border border-green/40 rounded-card p-8 text-center max-w-xl mx-auto">
          <p className="text-lg font-semibold text-green-lt">
            ¡Listo! Te contactamos en las próximas horas.
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
        <Field label="Nombre completo" required>
          <input
            type="text"
            name="nombre"
            required
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
            value={values.telefono}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Nombre del gym" required>
          <input
            type="text"
            name="gym"
            required
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
          {state === "submitting" ? "Enviando..." : "Quiero mi demo →"}
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
    <section id="demo" className="bg-darker py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 items-center">
        <SectionHeading
          align="center"
          badge="Contacto"
          title="Pedí una demo gratuita"
          subtitle="Te mostramos el sistema funcionando en vivo en 30 minutos. Sin compromiso."
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
  "bg-dark border border-border rounded-btn px-4 py-2.5 text-sm text-white placeholder:text-gray focus:outline-none focus:border-green transition-colors";

const errorClass = "text-sm text-red-400";
