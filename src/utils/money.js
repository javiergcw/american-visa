/** IVA estándar ventas Colombia (referencia para cotizaciones). */
export const IVA_RATE_CO = 0.19
export const IVA_PERCENT_LABEL = 19

/**
 * Desglose: subtotal en catálogo/propuesta = base sin IVA; IVA redondeado en pesos.
 * @param {number} subtotalExclIva
 */
export function computeIvaBreakdown(subtotalExclIva) {
  const subtotal = Math.round(Number(subtotalExclIva) || 0)
  const iva = Math.round(subtotal * IVA_RATE_CO)
  return {
    subtotal,
    iva,
    rate: IVA_RATE_CO,
    ratePercent: IVA_PERCENT_LABEL,
    totalInclIva: subtotal + iva,
  }
}

export function formatCop(value) {
  const n = Number(value) || 0
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)
}
