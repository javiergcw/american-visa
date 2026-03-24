import { getAvatarColors, getCompanyInitials } from './clientCardAvatar.js'

/** Iniciales para tarjeta: prioriza SKU (2 caracteres alfanuméricos), si no hay, del nombre del producto. */
export function getProductCardInitials(sku, productName) {
  const raw = String(sku || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÑ0-9]/gi, '')
  if (raw.length >= 2) return raw.slice(0, 2)
  if (raw.length === 1) return `${raw}${raw}`
  return getCompanyInitials('', productName)
}

export { getAvatarColors }
