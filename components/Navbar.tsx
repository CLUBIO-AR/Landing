"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { scrollToSection } from "@/lib/scrollToSection";

const LINKS = [
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "planes", label: "Planes" },
  { id: "demo", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => scrollToSection("top")} aria-label="Ir al inicio">
          <Logo size="sm" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`text-sm font-medium transition-colors ${
                active === link.id ? "text-green" : "text-gray-lt hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" onClick={() => scrollToSection("demo")}>
            Pedí una demo
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-b border-border px-4 sm:px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`text-left text-base font-medium ${
                active === link.id ? "text-green" : "text-gray-lt"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button onClick={() => handleNavigate("demo")} className="w-full justify-center">
            Pedí una demo
          </Button>
        </div>
      )}
    </header>
  );
}
