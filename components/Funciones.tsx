import fs from "node:fs";
import path from "node:path";
import { ChatMockup, Phone, type ChatMessage } from "./Phone";
import { CHAT_AVISO, CHAT_BOT, CHAT_ESTADO } from "./chats";
import { SectionHeading } from "./ui/SectionHeading";

interface Funcion {
  id: string;
  title: string;
  text: string;
  bullets: string[];
  // Ruta dentro de /public. Si el archivo existe se muestra el video;
  // si no, el chat de ejemplo. Para reemplazar un video, usar un nombre
  // nuevo (los .mp4 tienen caché inmutable de 1 año).
  video: string;
  chat: ChatMessage[];
}

const FUNCIONES: Funcion[] = [
  {
    id: "avisos",
    title: "Avisos de cuota por WhatsApp",
    text: "Antes del vencimiento a cada alumno le llega un mensaje con su cuota y el botón para pagar. Si no paga, le sigue avisando por vos.",
    bullets: [
      "Salen con el nombre de tu negocio",
      "Pagan con MercadoPago sin crear cuenta",
      "Cuando paga, le llega la confirmación",
    ],
    video: "/demos/avisos.mp4",
    chat: CHAT_AVISO,
  },
  {
    id: "estado-de-cuenta",
    title: "Estado de cuenta al instante",
    text: "Tu alumno escribe su DNI y ve cuánto debe y qué cuotas tiene pendientes. Vos no tenés que contestar ni buscar nada.",
    bullets: [
      "Disponible a cualquier hora",
      "Con el botón para pagar lo que debe",
      "Siempre actualizado con los pagos",
    ],
    video: "/demos/estado-de-cuenta.mp4",
    chat: CHAT_ESTADO,
  },
  {
    id: "bot",
    title: "Bot que responde consultas",
    text: "Precios, horarios, actividades y clase de prueba. El bot contesta a los interesados aunque sean las 12 de la noche, y no perdés a nadie por tardar en responder.",
    bullets: [
      "Responde con la info de tu negocio",
      "Atiende a interesados y alumnos",
      "Vos ves todas las conversaciones",
    ],
    video: "/demos/bot-consultas.mp4",
    chat: CHAT_BOT,
  },
];

// Se evalúa en el build (Server Component estático).
function hasVideo(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export function Funciones() {
  return (
    <section id="funciones" className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 md:gap-24">
        <SectionHeading
          title="Todo pasa por WhatsApp"
          subtitle="Donde tus alumnos ya están. Sin apps nuevas ni contraseñas."
        />

        {FUNCIONES.map((f, i) => (
          <article
            key={f.id}
            id={f.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div className={`flex flex-col gap-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <h3 className="font-display text-3xl md:text-4xl leading-tight">{f.title}</h3>
              <p className="text-lg text-gray-lt leading-relaxed">{f.text}</p>
              <ul className="flex flex-col gap-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-base text-white">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime ring-2 ring-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <Phone>
              {hasVideo(f.video) ? (
                <video
                  src={f.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`Demo: ${f.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ChatMockup contact="Box Club" messages={f.chat} />
              )}
            </Phone>
          </article>
        ))}
      </div>
    </section>
  );
}
