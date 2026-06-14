import { Logo } from "./Logo";

const LINKS = [
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "planes", label: "Planes" },
  { id: "demo", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-darker border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex flex-col gap-3">
          <Logo size="sm" />
          <p className="text-sm text-gray">Tus cuotas se cobran solas.</p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-gray-lt hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 text-sm text-gray md:items-end">
          <a href="mailto:contacto@clubio.com.ar" className="text-gray-lt hover:text-white transition-colors">
            contacto@clubio.com.ar
          </a>
          <p>© 2026 CLUBIO · Sistema de gestión para gimnasios</p>
        </div>
      </div>
    </footer>
  );
}
