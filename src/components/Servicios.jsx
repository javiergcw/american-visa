import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SERVICIOS = [
  {
    id: 'cableado',
    title: 'Cableado estructurado',
    description:
      'Diseño e instalación de cableado estructurado para voz y datos, fibra óptica, empalmes y peinado de racks. Base física fiable para redes, video y voz.',
    linkLabel: 'Cableado y fibra óptica',
    image: 'https://picsum.photos/seed/av-card-1/720/720',
  },
  {
    id: 'redes',
    title: 'Redes y conectividad',
    description:
      'Redes WiFi, administración, seguridad perimetral, firewalls y usuarios. Conectamos sus sedes con criterio de rendimiento y protección.',
    linkLabel: 'Soluciones de red',
    image: 'https://picsum.photos/seed/av-card-2/720/720',
  },
  {
    id: 'telefonia',
    title: 'Telefonía PBX-IP',
    description:
      'Conmutadores IP y análogos, soluciones híbridas, venta de equipos y soporte Asterisk y Elastix. Call Center con grabación y métricas.',
    linkLabel: 'Comunicaciones unificadas',
    image: 'https://picsum.photos/seed/av-card-3/720/720',
  },
  {
    id: 'video',
    title: 'Video vigilancia y CCTV',
    description:
      'Integración de sistemas de video IP y analógico, grabación y visualización para supervisión operativa y respaldo de evidencias.',
    linkLabel: 'Video e integración',
    image: 'https://picsum.photos/seed/av-card-4/720/720',
  },
  {
    id: 'acceso',
    title: 'Control de acceso e intrusiones',
    description:
      'Lectores, alarmas y automatización para delimitar accesos y recibir alertas a tiempo. Ideal para oficinas, bodegas y entornos mixtos.',
    linkLabel: 'Accesos y alarmas',
    image: 'https://picsum.photos/seed/av-card-5/720/720',
  },
]

function useVisibleCards() {
  const [n, setN] = useState(1)
  useEffect(() => {
    const q = () => {
      const w = window.innerWidth
      if (w >= 1024) setN(3)
      else if (w >= 768) setN(2)
      else setN(1)
    }
    q()
    window.addEventListener('resize', q)
    return () => window.removeEventListener('resize', q)
  }, [])
  return n
}

export default function Servicios() {
  const visible = useVisibleCards()
  const maxIndex = Math.max(0, SERVICIOS.length - visible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const go = useCallback(
    (dir) => {
      setIndex((i) => Math.min(maxIndex, Math.max(0, i + dir)))
    },
    [maxIndex],
  )

  const progress = maxIndex <= 0 ? 1 : index / maxIndex

  return (
    <section
      id="servicios"
      className="scroll-mt-36 border-y border-slate-200/80 bg-surface py-section-servicios"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera editorial */}
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-50px' }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow-brand">Sistemas de seguridad e infraestructura</p>
          <h2 className="section-heading-h2 mt-3">
            Tecnología de clase profesional, pensada para su operación
          </h2>
          <p className="section-lead mt-5">
            Trabajamos con usted para entender sus retos de conectividad y seguridad electrónica. Le proponemos la
            combinación adecuada de servicios —cableado, redes, voz, video y control— con instalación y soporte
            cercanos.
          </p>
        </motion.div>

        {/* Carrusel de tarjetas (ancho interior = N/V × contenedor; desplazamiento en % del interior) */}
        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <div className="overflow-hidden">
            <div
              className="flex transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: `${(SERVICIOS.length / visible) * 100}%`,
                transform: `translateX(-${(index * 100) / SERVICIOS.length}%)`,
              }}
            >
              {SERVICIOS.map((s) => (
                <article
                  key={s.id}
                  className="shrink-0 px-2 sm:px-3 lg:px-4"
                  style={{ width: `${100 / SERVICIOS.length}%` }}
                >
                  <div className="mx-auto flex h-full max-w-md flex-col lg:max-w-none">
                    <div className="relative aspect-3/4 overflow-hidden rounded-md bg-slate-200 shadow-sm ring-1 ring-slate-200/90">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-header sm:text-xl">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                      {s.description}
                    </p>
                    <Link
                      to="/#contacto"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-header"
                    >
                      {s.linkLabel}
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Barra de progreso + contador + flechas (mismo lenguaje que HeroBannerCarousel) */}
          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <div
              className="flex w-full flex-col sm:max-w-xl lg:max-w-2xl"
              role="status"
              aria-label={`Carrusel de servicios, posición ${index + 1} de ${maxIndex + 1}`}
            >
              <div
                className="h-0.5 w-full overflow-hidden rounded-full bg-slate-200/90"
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
                  style={{ width: `${maxIndex <= 0 ? 100 : 12 + progress * 88}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold tabular-nums tracking-wide text-slate-600 sm:text-sm">
                {index + 1}/{maxIndex + 1}
              </p>
            </div>
            <div className="flex shrink-0 justify-end gap-2 sm:justify-start">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index <= 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold text-header shadow-md shadow-black/25 transition-[transform,background-color,box-shadow,opacity] hover:scale-105 hover:bg-gold/90 hover:shadow-lg disabled:pointer-events-none disabled:opacity-35 disabled:hover:scale-100 sm:h-12 sm:w-12"
                aria-label="Anterior"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index >= maxIndex}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold text-header shadow-md shadow-black/25 transition-[transform,background-color,box-shadow,opacity] hover:scale-105 hover:bg-gold/90 hover:shadow-lg disabled:pointer-events-none disabled:opacity-35 disabled:hover:scale-100 sm:h-12 sm:w-12"
                aria-label="Siguiente"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
