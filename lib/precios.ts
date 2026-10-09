// Precios y tarifas que usa el cotizador (/cotizador). Fuente única: cambiá acá y se
// actualiza la página. Precios de CLUBIO en pesos, finales (monotributo: sin IVA aparte). Tarifas de terceros con IVA.

export const IVA = 0.21;

export type PlanId = "basic" | "multi";

export const PLANES: Record<PlanId, { nombre: string; precio: number; detalle: string }> = {
  basic: { nombre: "Basic", precio: 35_000, detalle: "1 sede · hasta 3 administradores" },
  multi: { nombre: "Multi", precio: 89_900, detalle: "Hasta 5 sedes · hasta 10 administradores" },
};

/** Precio por mes según alumnos activos (hasta `max` inclusive). Más allá del último tramo: a consultar. */
export type Tramo = { max: number; precio: number };

/** Avisos por WhatsApp desde el número de CLUBIO. Incluye los mensajes de Meta (los paga CLUBIO). */
export const AVISOS_CLUBIO: Tramo[] = [
  { max: 100, precio: 16_900 },
  { max: 200, precio: 29_900 },
  { max: 400, precio: 59_900 },
];

/** WhatsApp con bot y número propio del gym. Los mensajes de Meta los paga el gym aparte. */
export const BOT_NUMERO_PROPIO: Tramo[] = [
  { max: 100, precio: 14_900 },
  { max: 200, precio: 19_900 },
  { max: 400, precio: 29_900 },
];

export function precioTramo(tramos: Tramo[], alumnos: number): number | null {
  return tramos.find((t) => alumnos <= t.max)?.precio ?? null;
}

/** Comisiones de cobro, IVA incluido. */
export const COMISION = {
  mpAl35: 0.0149 * (1 + IVA), // Mercado Pago, link de pago, plata a 35 días
  mpInstante: 0.0629 * (1 + IVA), // Mercado Pago, link de pago, plata al instante
  cresium: 0.01 * (1 + IVA), // Cresium, por transferencia recibida
};

/** Meta: precio de un mensaje de plantilla (aviso) + IVA. */
export const META_MENSAJE = 37.68 * (1 + IVA);

/** Mensajes pagos por alumno por mes con número propio: avisos (hasta 3) + confirmación. */
export const META_MENSAJES_POR_ALUMNO = { min: 2, max: 4 };
