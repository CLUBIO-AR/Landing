<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Contexto de Proyecto — CLUBIO LANDING
> Leer al inicio de cada sesión de trabajo y antes de ejecutar /review.

## Descripción
Landing page de CLUBIO. Objetivo: convertir visitas en leads (gyms interesados en el producto).
Incluye información de planes, formulario de contacto y flujo hacia el onboarding del gym.

## Stack
- Next.js (App Router, TypeScript)
- Vercel (hosting)
- Clubio API (`/api/leads`) para almacenar leads

## Planes activos — CRÍTICO
Los precios y planes mostrados en la landing DEBEN ser consistentes con el producto real:
- **Basic**: USD 28/mes — 1 sede, 3 admins
- **Multi**: USD 75/mes — 5 sedes, 10 admins
- **WhatsApp**: add-on +USD 8/mes, disponible en todos los planes
- Plan 'plus' ELIMINADO junio 2026 — NO debe aparecer en ningún lugar
- Plan 'Pro' NO EXISTE todavía — si aparece en UI debe quedar como "Próximamente" sin precio
- Sin setup fee en ningún plan
- Alumnos ILIMITADOS en todos los planes

## Flujos críticos
1. **Captación de lead**: visitante completa formulario → POST a `{CLUBIO_API_URL}/api/leads` → Clubio procesa el lead
2. **Información de planes**: visitante ve precios y features → decide contactar

## Reglas de negocio invariantes
- Ningún precio o feature mostrado puede contradecir lo que el producto realmente ofrece
- El formulario de leads no debe almacenar datos sensibles (solo nombre, email, nombre del gym)
- Rate limiting o captcha en el formulario para evitar spam

## Consideraciones de seguridad específicas
- Sin autenticación compleja: solo formularios públicos
- Headers de seguridad configurados en `next.config.ts` (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy)
- Caché inmutable configurado para assets estáticos (`max-age=31536000, immutable`)
- Rate limiting o captcha en el formulario para evitar spam

## Performance — prioridad alta
Esta es la primera impresión del producto. Core Web Vitals críticos:
- LCP < 2.5s, CLS < 0.1
- `next/image` obligatorio para todas las imágenes
- `next/font` obligatorio para todas las fuentes
- Sin scripts de terceros bloqueantes

## Variables de entorno
- `NEXT_PUBLIC_CLUBIO_API_URL` — URL de la API de Clubio (default: `https://www.clubio.com.ar`)
- Usar siempre "www" — el apex hace redirect 307 que rompe CORS en preflights del formulario

## Reportes de revisión
`.claude/reports/review-[YYYY-MM-DD]-[HH-MM].md`
