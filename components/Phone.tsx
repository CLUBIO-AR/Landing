import type { ReactNode } from "react";

// Marco de celular para mostrar chats de WhatsApp o los videos demo.
// Las dimensiones son fijas (relación 9:19) para que el video y el mockup
// ocupen exactamente el mismo lugar y no haya saltos de layout.
export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[280px] sm:w-[300px] aspect-[9/19] rounded-[44px] bg-ink p-[10px] shadow-phone ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-chat">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[18px] left-1/2 -translate-x-1/2 h-[22px] w-[84px] rounded-full bg-ink"
      />
    </div>
  );
}

export type ChatMessage =
  | { from: "negocio" | "alumno"; text: string; time: string; button?: string }
  | { from: "sistema"; text: string };

// Conversación de WhatsApp estática. El nombre del contacto es el negocio
// del cliente: así se entiende que los mensajes salen con SU nombre.
export function ChatMockup({
  contact,
  messages,
}: {
  contact: string;
  messages: ChatMessage[];
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 bg-ink px-4 pt-12 pb-3 text-on-ink">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-bold text-lime-text">
          {contact.slice(0, 1)}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold">{contact}</p>
          <p className="text-[11px] opacity-70">Cuenta de empresa</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 px-3 pb-4">
        {messages.map((m, i) =>
          m.from === "sistema" ? (
            <p
              key={i}
              className="mx-auto rounded-md bg-card/80 px-2 py-1 text-[10px] text-gray"
            >
              {m.text}
            </p>
          ) : (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-snug text-ink shadow-sm ${
                m.from === "alumno"
                  ? "self-end rounded-tr-sm bg-bubble"
                  : "self-start rounded-tl-sm bg-card"
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              <p className="mt-1 text-right text-[10px] text-gray">{m.time}</p>
              {m.button && (
                <p className="-mx-3 -mb-2 mt-2 border-t border-border py-2 text-center text-[13px] font-bold text-green">
                  {m.button}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
