import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { heroBanners, HERO_AUTOPLAY_MS } from '../data/heroBanners.js'
import { hrefContactoCotizar } from '../data/cotizarDesdeHero.js'

/** Inicio del bloque de slide (menos alto que antes); alineado con el pt de la sección */
const SLIDE_TOP =
  'top-20 left-0 right-0 bottom-0 sm:top-24 lg:top-32 xl:top-36'

export default function HeroBannerCarousel() {
  const [index, setIndex] = useState(0)
  const n = heroBanners.length
  const slide = heroBanners[index]

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  useEffect(() => {
    const t = window.setInterval(() => go(1), HERO_AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [go, index])

  return (
    <section
      id="inicio"
      className="relative isolate scroll-mt-36 min-h-[min(74svh,680px)] overflow-hidden bg-header pt-20 sm:min-h-[min(78svh,760px)] sm:pt-24 lg:min-h-[min(82svh,840px)] lg:pt-32 xl:pt-36"
      aria-roledescription="carrusel"
      aria-label="Banners principales"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          role="group"
          aria-roledescription="diapositiva"
          aria-label={`${index + 1} de ${n}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className={`absolute ${SLIDE_TOP} overflow-hidden`}
        >
          {/* Fondo: vídeo, imagen o gradiente (exclusivos) */}
          {slide.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={slide.poster ?? undefined}
              aria-hidden
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          ) : slide.image ? (
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: slide.gradient }}
              aria-hidden
            />
          )}

          <div
            className="absolute inset-0 bg-linear-to-b from-[#050a12]/80 via-header/55 to-[#050a12]/90"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,102,173,0.25),transparent_55%)]" aria-hidden />
          {/* Funde el borde superior del slide con el header para que no se note una franja de otro color */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-3 h-20 bg-linear-to-b from-header via-header/40 to-transparent sm:h-24"
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>

      {/* Contenido centrado en la zona del slide (misma caja que el fondo, bajo el header) */}
      <div
        className={`absolute z-10 flex flex-col items-center justify-center px-4 pb-28 text-center sm:px-6 sm:pb-32 lg:px-8 ${SLIDE_TOP}`}
      >
        <div className="mx-auto w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id + '-t'}
              initial={{ opacity: 1, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-4xl text-balance text-center text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          {/* Barra tipo píldora: móvil apilada; tablet+ horizontal */}
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mx-auto mt-10 w-full max-w-4xl"
          >
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/30 backdrop-blur-md sm:flex-row sm:rounded-full sm:border-white/20">
              <Link
                to={hrefContactoCotizar(slide.cta.cotizar)}
                className="flex shrink-0 items-center justify-center bg-gold px-6 py-3.5 text-center text-sm font-bold text-header transition-colors hover:bg-gold/90 sm:py-3 sm:text-base"
              >
                {slide.cta.label}
              </Link>
              <div className="grid grid-cols-2 divide-x divide-y divide-white/15 border-t border-white/15 sm:flex sm:flex-1 sm:flex-wrap sm:divide-x sm:divide-y-0 sm:border-t-0 sm:border-l sm:border-white/15">
                {slide.links.map((l) => (
                  <Link
                    key={l.label}
                    to={hrefContactoCotizar(l.cotizar)}
                    className="flex items-center justify-center gap-1.5 bg-white/95 px-3 py-3 text-center text-xs font-semibold text-header transition-colors hover:bg-white sm:flex-1 sm:min-w-0 sm:px-4 sm:py-3.5 sm:text-sm"
                  >
                    <span className="text-brand" aria-hidden>
                      →
                    </span>
                    <span className="leading-tight">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flechas: solo en la zona del slide, no en la franja del header */}
      <div
        className={`pointer-events-none absolute z-20 flex items-center justify-between px-2 sm:px-4 ${SLIDE_TOP}`}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold text-header shadow-md shadow-black/25 transition-[transform,background-color,box-shadow] hover:scale-105 hover:bg-gold/90 hover:shadow-lg sm:h-12 sm:w-12"
          aria-label="Banner anterior"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold text-header shadow-md shadow-black/25 transition-[transform,background-color,box-shadow] hover:scale-105 hover:bg-gold/90 hover:shadow-lg sm:h-12 sm:w-12"
          aria-label="Banner siguiente"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicador scroll (más abajo, cerca del borde inferior del banner) */}
      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80 transition-colors hover:text-white sm:bottom-10 lg:bottom-12"
        aria-label="Ir a la sección Nosotros"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm">
          <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </a>

      {/* Barra de progreso + contador (derecha) */}
      <div
        className="absolute bottom-5 right-4 z-20 flex w-[min(12rem,42vw)] flex-col items-end sm:bottom-6 sm:right-6 lg:w-64"
        role="status"
        aria-label={`Banner ${index + 1} de ${n}`}
      >
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            key={index}
            className="h-full bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: HERO_AUTOPLAY_MS / 1000, ease: 'linear' }}
          />
        </div>
        <p className="mt-2 text-xs font-bold tabular-nums tracking-wide text-white/90 sm:text-sm">
          {index + 1}/{n}
        </p>
      </div>
    </section>
  )
}
