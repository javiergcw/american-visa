/**
 * Banners del inicio: `image` o `video` por slide (exclusivos). `poster` opcional en vídeo.
 * CTA y enlaces del pill usan `cotizar` → ver `cotizarDesdeHero.js` y formulario de contacto.
 */
const LINKS_PILL = [
  { label: 'Control de acceso', cotizar: 'control-acceso' },
  { label: 'Video vigilancia', cotizar: 'video' },
  { label: 'Servicios IT', cotizar: 'it' },
  { label: 'Nosotros', cotizar: 'nosotros' },
]

export const heroBanners = [
  {
    id: 'security',
    title: 'Video vigilancia y protección visual para su operación',
    gradient: 'linear-gradient(180deg, #050a12 0%, #0a1628 100%)',
    image: '/security.jpg',
    video: null,
    cta: { label: 'Cotizar proyecto', cotizar: 'general' },
    links: LINKS_PILL,
  },
  {
    id: 'cars',
    title: 'Seguridad electrónica para empresas, comercios y espacios críticos',
    gradient: 'linear-gradient(180deg, #050a12 0%, #0a1628 100%)',
    image: '/cars.jpg',
    video: null,
    cta: { label: 'Cotizar proyecto', cotizar: 'general' },
    links: LINKS_PILL,
  },
  {
    id: 'video-hero',
    title: 'Diseño, instalación y soporte en Colombia y el mundo',
    gradient: 'linear-gradient(180deg, #050a12 0%, #0a1628 100%)',
    image: null,
    video: '/220941.mp4',
    poster: '/security.jpg',
    cta: { label: 'Cotizar proyecto', cotizar: 'general' },
    links: LINKS_PILL,
  },
]

export const HERO_AUTOPLAY_MS = 8000
