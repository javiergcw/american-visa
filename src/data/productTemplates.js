/** Plantillas de presentación de producto (panel / futura vista pública). */
export const PRODUCT_TEMPLATE_IDS = [
  'media-texto-1',
  'texto-media-2',
  'banner-media-3',
  'banner-text-media-4',
]

export const DEFAULT_PRODUCT_TEMPLATE = PRODUCT_TEMPLATE_IDS[0]

export function normalizeProductTemplate(value) {
  const v = String(value ?? '').trim()
  return PRODUCT_TEMPLATE_IDS.includes(v) ? v : DEFAULT_PRODUCT_TEMPLATE
}
