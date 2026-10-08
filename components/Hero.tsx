import { Button } from "./ui/Button";
import { ChatMockup, Phone } from "./Phone";
import { CHAT_AVISO } from "./chats";
import { RotatingQuestion } from "./RotatingQuestion";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-dark pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <div className="flex flex-col items-start gap-7">
          <RotatingQuestion />

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
            Si cobrás cuotas, CLUBIO es para vos.
          </h1>

          <p className="text-lg md:text-xl text-gray-lt leading-relaxed max-w-xl">
            Le avisa a cada alumno por WhatsApp cuándo vence su cuota, le manda cómo pagarla
            y te muestra quién pagó. Sin perseguir a nadie y sin planillas.
          </p>

          <p className="text-base md:text-lg text-white leading-relaxed max-w-xl border-l-4 border-lime pl-4">
            Cobrá con MercadoPago o seguí trabajando con transferencias, como prefieras.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button size="lg" href="#demo">
              Pedí una demo gratis
            </Button>
            <Button size="lg" variant="outline" href="#funciones">
              Ver cómo funciona
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-lt">
            <li>Alumnos ilimitados</li>
            <li>Sin setup fee</li>
            <li>Sin contrato</li>
          </ul>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-10 bottom-0 rounded-[48px] bg-green rotate-3"
          />
          <Phone className="relative -rotate-2">
            <ChatMockup contact="Box Club" messages={CHAT_AVISO} />
          </Phone>
        </div>
      </div>
    </section>
  );
}
