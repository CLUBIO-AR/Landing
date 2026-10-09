# ARCHITECTURE — CLUBIO Landing

> Snapshot técnico generado por /snapshot. Actualizá con `/snapshot --update` tras cambios importantes.

## Archivos clave

### Entrada y layout
- `app/layout.tsx` — RootLayout: fuentes via `next/font`, metadata completa con OG/Twitter, Schema.org JSON-LD hardcodeado sin precios (estático para evitar XSS vía `dangerouslySetInnerHTML`)
- `app/page.tsx` — Única página: Navbar + Hero, ParaQuien, Problema, Funciones, ComoFunciona, DemoVideo, Diferenciadores, Planes, Preguntas, FormDemo + Footer. Todos Server Components salvo los que tienen estado.
- `next.config.ts` — Headers de seguridad (CSP, X-Frame-Options, etc.), caché inmutable para assets estáticos, compresión habilitada.

### Componentes — Client
- `components/Navbar.tsx` — Client Component. Fixed navbar con backdrop blur al scroll, IntersectionObserver para resaltar sección activa, menú mobile responsive.
- `components/FormDemo.tsx` — Client Component. Formulario de captación de leads: estado controlado, validación client-side, honeypot anti-spam, `submittingRef` para evitar doble submit, POST a `NEXT_PUBLIC_CLUBIO_API_URL/api/leads`.

### Componentes — Server
- `components/Hero.tsx` — Server Component. Pregunta rotativa (`RotatingQuestion`, client) + headline + celular con chat de WhatsApp (`Phone`/`ChatMockup`).
- `components/Funciones.tsx` — Server Component. Avisos, estado de cuenta y bot; muestra el video de `public/demos/` si existe en el build, si no el chat de ejemplo (`components/chats.ts`).
- `components/Preguntas.tsx` — Server Component. FAQ con `<details>` nativo.
- `components/Planes.tsx` — Server Component. Basic y Multi sin precios + tarjeta del módulo WhatsApp. CTA "Consultar precio" → formulario. Pro oculto.

### UI primitivos
- `components/ui/Button.tsx` — Polimórfico: si recibe `href` renderiza `<a>`, si no renderiza `<button>`. Variantes: primary, outline, ghost.
- `components/ui/Card.tsx`, `Badge.tsx`, `SectionHeading.tsx` — UI stateless, sin lógica.

### Página oculta
- `app/cotizador/page.tsx` + `components/Cotizador.tsx` — cotizador interno (noindex, fuera del sitemap y sin links). El gym elige plan, forma de cobro y WhatsApp; muestra el total por mes y a quién se le paga cada parte (CLUBIO, Mercado Pago/Cresium, Meta). La configuración viaja en la URL (`?gym=&plan=&alumnos=&cuota=&cobro=&wa=&pruebas=`) para compartirla.

### Lib
- `lib/precios.ts` — precios en pesos de CLUBIO y tarifas de terceros que usa el cotizador. Fuente única: cambiar acá.
- `lib/scrollToSection.ts` — Smooth scroll con offset de 80px para compensar navbar fija.

### SEO / metadata
- `app/robots.ts`, `app/sitemap.ts` — Generación automática de robots.txt y sitemap.
- `app/opengraph-image.tsx`, `app/twitter-image.tsx` — OG images dinámicas.

---

## Patrones

### Captación de leads
`FormDemo` hace `fetch` directo al browser contra `NEXT_PUBLIC_CLUBIO_API_URL/api/leads`. No hay API Route interna — la landing es un proxy cero; el payload va directo a la Clubio API. Campos enviados: `nombre`, `email`, `telefono`, `gym_nombre`, `cantidad_alumnos`, `como_nos_conocio`. El rubro ("¿A qué te dedicás?") viaja dentro de `gym_nombre` como `Nombre (Rubro)` porque la API todavía no tiene ese campo. El campo `website` es honeypot (posición absolute offscreen, tabIndex -1).

### Navegación
Sin `<Link>` de Next.js — la landing es de una sola página. La Navbar usa `scrollToSection(id)` para scroll suave. Los `Button` con `href="#section-id"` hacen anchor nativo (sin JS); los botones de Navbar llaman `scrollToSection` explícitamente.

### Server vs Client split
Regla implícita: todo es Server Component por defecto. Se marca `"use client"` solo cuando hay estado/efectos: Navbar (scroll state, IntersectionObserver) y FormDemo (form state, fetch).

### Datos de planes
Los planes viven en el array `PLANS` dentro de `components/Planes.tsx`. No hay CMS ni fetch externo. Para cambiar precios o features hay que editar ese archivo. El array es la fuente de verdad de la UI — debe mantenerse sincronizado con `AGENTS.md`.

### Seguridad — CSP
`connect-src` del CSP en `next.config.ts` permite solo `'self'` y `https://app.clubio.com.ar`. Si la URL de la API cambia, hay que actualizar el CSP además de la variable de entorno.

---

## Decisiones de arquitectura

- **Sin API Route para leads**: el POST va directo desde el browser a la Clubio API. Evita un hop innecesario. Requiere que el CSP y CORS estén correctamente configurados en `app.clubio.com.ar`.
- **`app.clubio.com.ar` en lugar del apex**: el apex `clubio.com.ar` hace 307 redirect que rompe CORS en preflights OPTIONS. Variable `NEXT_PUBLIC_CLUBIO_API_URL` defaultea a `https://app.clubio.com.ar`.
- **Schema.org hardcodeado**: el JSON-LD de `layout.tsx` usa datos estáticos para evitar que valores dinámicos inyecten contenido malicioso vía `dangerouslySetInnerHTML`.
- **Button polimórfico (href/button)**: en lugar de dos componentes separados, `Button` detecta la presencia de `href` para renderizar `<a>` o `<button>`. Requiere discriminated union en TypeScript para tipado correcto.
- **Honeypot en lugar de CAPTCHA**: anti-spam sin fricción para el usuario. Bots rellenan el campo oculto `website`; si está completo, el form simula éxito silenciosamente.

---

## Trabajo en curso

### En desarrollo
- **Plan Pro**: oculto en la landing hasta su lanzamiento.
- **Campo `rubro` en leads**: pendiente en la API de Clubio; hoy va concatenado en `gym_nombre`.

### Deuda técnica conocida
- Sin rate limiting server-side: el honeypot es la única defensa anti-spam. Un atacante que ignore el campo honeypot puede spamear la Clubio API directamente.

### TODOs críticos
- Ninguno en el código del proyecto.
