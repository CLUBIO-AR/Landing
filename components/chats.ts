import type { ChatMessage } from "./Phone";

// Conversaciones de ejemplo que se muestran mientras no haya video demo
// (y en el hero). Siguen los flujos reales del bot y de las plantillas de la app
// (lib/whatsapp-bot.ts, lib/notifications/channels/whatsapp.ts): si cambian
// esos textos, actualizar acá. Nombres, montos, DNI y alias son ficticios.

// Aviso de cuota en modo link de pago (plantilla aviso_cuota + confirmación).
export const CHAT_AVISO: ChatMessage[] = [
  { from: "sistema", text: "Hoy" },
  {
    from: "negocio",
    text: "Hola Martina 👋\nTu cuota de octubre de Cross está por vencer.\n💰 Total: $30.000\n📅 Fecha límite: 10/10",
    time: "09:00",
    button: "Pagar ahora",
  },
  {
    from: "negocio",
    text: "¡Gracias Martina! Recibimos tu pago de octubre ✅",
    time: "09:04",
  },
];

// Estado de cuenta en modo transferencia (alias del gym).
export const CHAT_ESTADO: ChatMessage[] = [
  { from: "alumno", text: "Mi cuenta", time: "19:12" },
  {
    from: "negocio",
    text: "Para ver tu estado de cuenta, escribime tu DNI (solo números).",
    time: "19:12",
  },
  { from: "alumno", text: "38456789", time: "19:13" },
  {
    from: "negocio",
    text: "Pendiente:\n• Octubre · Cross: $30.000\n💰 Total a pagar: $30.000\n💳 Alias: BOX.CLUB.CUOTAS",
    time: "19:13",
    button: "Copiar alias",
  },
];

// Consulta de actividades y reserva de clase de prueba.
export const CHAT_BOT: ChatMessage[] = [
  {
    from: "negocio",
    text: "¿Sobre qué actividad querés saber? 👇",
    time: "23:47",
    button: "Ver actividades",
  },
  { from: "alumno", text: "Cross", time: "23:47" },
  {
    from: "negocio",
    text: "Cross: $30.000 por mes\nLun a Sáb: 7, 8, 18, 19 y 20 h",
    time: "23:47",
    button: "Clase de prueba",
  },
  { from: "alumno", text: "Mañana 18:00", time: "23:48" },
  {
    from: "negocio",
    text: "¡Listo! 🙌 Te esperamos mañana a las 18:00 para tu clase de prueba.",
    time: "23:48",
  },
];
