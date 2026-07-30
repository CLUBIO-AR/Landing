"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      setPlaying(false);
    });
  };

  return (
    <section id="demo-video" className="bg-dark py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading
          badge="Demo"
          title="Mira cómo Clubio automatiza tus cobros"
          subtitle="Desde la cuota generada hasta el pago confirmado — todo automático."
        />

        <div className="relative rounded-card overflow-hidden border border-border shadow-card bg-card">
          <video
            ref={videoRef}
            src="/ClubioDemo.mp4"
            controls
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="w-full aspect-video"
          />

          {/* Overlay de play personalizado — desaparece al reproducir */}
          {!playing && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Reproducir demo"
            >
              <div className="w-20 h-20 rounded-full bg-green flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Play size={32} className="text-dark fill-dark ml-1" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
