/**
 * Iniciales tipo “Google” a partir de la empresa; si no hay, del nombre del contacto.
 */
export function getCompanyInitials(company, contactName) {
  const src = (company || contactName || '').trim()
  if (!src) return '?'
  const words = src.split(/\s+/).filter((w) => w.length > 0)
  const alnum = (c) => /[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]/.test(c)
  const cleanWords = words.filter((w) => alnum(w[0]))
  if (cleanWords.length >= 2) {
    const a = cleanWords[0].match(/[a-zA-Z0-9áéíóúñ]/i)
    const b = cleanWords[1].match(/[a-zA-Z0-9áéíóúñ]/i)
    return `${a ? a[0] : '?'}` + `${b ? b[0] : '?'}`.toUpperCase()
  }
  const letters = src.match(/[a-zA-Z0-9áéíóúñ]/gi) || []
  if (letters.length >= 2) return (letters[0] + letters[1]).toUpperCase()
  if (letters.length === 1) return (letters[0] + letters[0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

/** Paleta acorde al panel: azul oscuro, marca, dorados */
const AVATAR_PALETTE = [
  { bg: '#0a1628', fg: '#e8bc55' },
  { bg: '#3b66ad', fg: '#ffffff' },
  { bg: '#152a45', fg: '#e8bc55' },
  { bg: '#e8bc55', fg: '#0a1628' },
  { bg: '#2d5282', fg: '#f0cd7a' },
  { bg: '#c99a3d', fg: '#0a1628' },
  { bg: '#1a3a5c', fg: '#ffffff' },
  { bg: '#f0cd7a', fg: '#0a1628' },
]

export function getAvatarColors(seed) {
  const s = String(seed || 'x')
  let h = 0
  for (let i = 0; i < s.length; i += 1) {
    h = s.charCodeAt(i) + ((h << 5) - h)
  }
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length]
}
