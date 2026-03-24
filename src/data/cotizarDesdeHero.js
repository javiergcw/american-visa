/**
 * Enlaces a contacto con ?cotizar=<slug> (hash #contacto).
 * Usado desde el hero y reutilizable en otros CTAs.
 */
export const COTIZAR_QUERY = 'cotizar'

/** Slugs permitidos → textos para el formulario y WhatsApp */
export const COTIZAR_DESDE_HERO = {
  general: {
    label: 'Cotización general de proyecto',
    hint: 'Deseo una cotización para mi proyecto. Por favor indíquenme siguientes pasos.',
  },
  'control-acceso': {
    label: 'Control de acceso',
    hint: 'Me interesa cotizar soluciones de control de acceso (lectores, torniquetes, integración, etc.).',
  },
  video: {
    label: 'Video vigilancia',
    hint: 'Me interesa cotizar video vigilancia / CCTV (cámaras IP o analógicas, grabación, visualización).',
  },
  it: {
    label: 'Servicios IT y redes',
    hint: 'Me interesa cotizar servicios IT: redes, WiFi, cableado, firewall o telecomunicaciones.',
  },
  nosotros: {
    label: 'Información y asesoría',
    hint: 'Quiero recibir asesoría o más información sobre sus servicios y cobertura.',
  },
}

export function normalizeCotizarSlug(raw) {
  if (raw && COTIZAR_DESDE_HERO[raw]) return raw
  return 'general'
}

/** Orden fijo en selects y UI */
export const COTIZAR_INTERES_ORDER = ['general', 'control-acceso', 'video', 'it', 'nosotros']

/** Ruta interna a la sección contacto con interés predefinido */
export function hrefContactoCotizar(slug) {
  const s = normalizeCotizarSlug(slug)
  return `/?${COTIZAR_QUERY}=${encodeURIComponent(s)}#contacto`
}
