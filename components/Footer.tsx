import { Logo } from "./Logo";

const LINKS = [
  { id: "para-quien", label: "Para quién es" },
  { id: "funciones", label: "Funciones" },
  { id: "planes", label: "Planes" },
  { id: "preguntas", label: "Preguntas" },
  { id: "demo", label: "Contacto" },
];

// Redes de CLUBIO. Un link en null no se muestra — completar la URL para que aparezca.
const REDES: { label: string; href: string | null }[] = [
  { label: "Instagram", href: "https://www.instagram.com/clubio.ar/" },
  { label: "Facebook", href: null },
];

// Desarrolladora. LinkedIn en null no se muestra hasta completar la URL.
const DESARROLLO = {
  nombre: "Valentina Sosa",
  email: "ing.valentina.sosa@gmail.com",
  linkedin: null as string | null,
};

const linkClass = "text-gray-lt hover:text-white transition-colors";

export function Footer() {
  const redes = REDES.filter((r): r is { label: string; href: string } => r.href !== null);

  return (
    <footer className="bg-darker border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo size="sm" />
          <p className="text-sm text-gray">Tus cuotas se cobran solas.</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm" aria-label="Secciones">
          <p className="font-bold text-white">Producto</p>
          {LINKS.map((link) => (
            <a key={link.id} href={`/#${link.id}`} className={linkClass}>
              {link.label}
            </a>
          ))}
          <a href="/privacidad" className={linkClass}>
            Política de privacidad
          </a>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-bold text-white">Contacto</p>
          <a href="mailto:contacto@clubio.com.ar" className={linkClass}>
            contacto@clubio.com.ar
          </a>
          {redes.map((r) => (
            <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {r.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-bold text-white">Desarrollo</p>
          <p className="text-gray-lt">
            Diseñado y desarrollado por <span className="text-white">{DESARROLLO.nombre}</span>
          </p>
          <a href={`mailto:${DESARROLLO.email}`} className={linkClass}>
            {DESARROLLO.email}
          </a>
          {DESARROLLO.linkedin && (
            <a href={DESARROLLO.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-border">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-gray">
          © 2026 CLUBIO. Cobro de cuotas para gimnasios, profes, escuelas y clubes.
        </p>
      </div>
    </footer>
  );
}
