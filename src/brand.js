import { PLACEHOLDER_IMAGES } from './data/remotePlaceholderImages.js'

/** Logo oficial en /public */
export const LOGO_SRC = '/logo.png'

/** Correo de contacto comercial */
export const CONTACT_EMAIL = 'tecnologia@grupoamericanvisa.com'

/** WhatsApp (sin +) para enlaces wa.me */
export const WA_PHONE = '573011875807'

/** Mismo número, formato legible en la UI (Colombia +57 …) */
export const WA_PHONE_DISPLAY =
  WA_PHONE.startsWith('57') && WA_PHONE.length === 12
    ? `+57 ${WA_PHONE.slice(2, 5)} ${WA_PHONE.slice(5, 8)} ${WA_PHONE.slice(8)}`
    : `+${WA_PHONE}`

export const WA_BASE = `https://wa.me/${WA_PHONE}`

/** Imagen lateral Contacto / login (placeholder remoto; ver remotePlaceholderImages.js). */
export const CONTACT_SIDE_IMAGE = PLACEHOLDER_IMAGES.contactSide
