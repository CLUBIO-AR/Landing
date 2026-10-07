const NAVBAR_OFFSET = 80;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  // Fuera de la home (ej: /privacidad) la sección no existe: volver a la home en esa sección.
  if (!el) {
    window.location.href = id === "top" ? "/" : `/#${id}`;
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
