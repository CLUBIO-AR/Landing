"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "FORMSPREE_ID";

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

export function FormDemo() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const validationMessage = validate();
    if (validationMessage) {
      event.preventDefault();
      setClientError(validationMessage);
      return;
    }
    setClientError(null);
    handleSubmit(event);
  };

  if (state.succeeded) {
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
          <ValidationError prefix="Nombre" field="nombre" errors={state.errors} className={errorClass} />
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
          <ValidationError prefix="Email" field="email" errors={state.errors} className={errorClass} />
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
          <ValidationError prefix="Teléfono" field="telefono" errors={state.errors} className={errorClass} />
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
          <ValidationError prefix="Gym" field="gym" errors={state.errors} className={errorClass} />
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
        {state.errors && state.errors.getFormErrors().length > 0 && (
          <p className={errorClass}>
            Algo salió mal. Escribinos a contacto@clubio.com.ar
          </p>
        )}

        <Button type="submit" size="lg" disabled={state.submitting} className="w-full justify-center">
          {state.submitting ? "Enviando..." : "Quiero mi demo →"}
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
          title="Pedí tu demo"
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
