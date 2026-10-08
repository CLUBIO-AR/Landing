import type { ChatMessage } from "./Phone";

// Conversaciones de ejemplo que se muestran mientras no haya video demo
// (y en el hero). Nombres, montos y DNI son ficticios.

export const CHAT_AVISO: ChatMessage[] = [
  { from: "sistema", text: "Hoy" },
  {
    from: "negocio",
    text: "¡Hola Martina! Tu cuota de octubre de $25.000 vence el viernes 10.",
    time: "09:00",
    button: "Pagar cuota",
  },
  {
    from: "negocio",
    text: "¡Gracias Martina! Recibimos tu pago de octubre ✅",
    time: "09:04",
  },
  { from: "alumno", text: "¡Genial, gracias!", time: "09:05" },
];

export const CHAT_ESTADO: ChatMessage[] = [
  { from: "alumno", text: "Hola, ¿cuánto debo?", time: "19:12" },
  { from: "negocio", text: "¡Hola! Pasame tu DNI y te digo.", time: "19:12" },
  { from: "alumno", text: "38456789", time: "19:13" },
  {
    from: "negocio",
    text: "Lucas, tenés 1 cuota pendiente:\nOctubre: $25.000",
    time: "19:13",
    button: "Pagar ahora",
  },
];

export const CHAT_BOT: ChatMessage[] = [
  { from: "sistema", text: "Hoy" },
  {
    from: "alumno",
    text: "Hola! ¿Cuánto sale la cuota y qué horarios tienen?",
    time: "23:47",
  },
  {
    from: "negocio",
    text: "¡Hola! La cuota mensual es de $25.000.\nAbrimos de lunes a viernes de 7 a 22 h y sábados de 9 a 13 h.",
    time: "23:47",
  },
  {
    from: "negocio",
    text: "¿Querés venir a una clase de prueba?",
    time: "23:47",
    button: "Sí, quiero probar",
  },
];
