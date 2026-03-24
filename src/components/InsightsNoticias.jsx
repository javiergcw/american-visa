import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PLACEHOLDER_IMAGES } from '../data/remotePlaceholderImages.js'

const view = { once: true, amount: 0.12, margin: '-40px' }

function CardButton({ children, to, variant = 'solid' }) {
  if (variant === 'outline') {
    return (
      <Link
        to={to}
        className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-[transform,background-color,border-color] hover:scale-[1.01] hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-5"
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      to={to}
      className="btn-gold btn-gold--default"
    >
      {children}
    </Link>
  )
}

export default function InsightsNoticias() {
  return (
    <section
      id="insights"
      className="scroll-mt-36 border-y border-slate-200/80 bg-surface py-section-insights"
      aria-label="Recursos y novedades en seguridad electrónica"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-heading-h2">
            Novedades y perspectivas en seguridad
          </h2>
          <p className="mt-3 section-lead">
            Tecnología, tendencias y buenas prácticas para proteger su operación y sus espacios.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {/* Tarjeta principal — tablet: ancho completo; desktop: 2/3 + altura de las dos derechas */}
          <motion.article
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="group relative flex min-h-[min(22rem,70vw)] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-header shadow-lg shadow-slate-900/10 md:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0 lg:flex-row"
          >
            <div
              className="absolute inset-0 bg-linear-to-br from-dark via-header to-brand/90 opacity-95"
              aria-hidden
            />
            <div className="relative z-10 flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8 lg:max-w-[min(100%,26rem)] lg:pr-4 xl:max-w-md">
              <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-[1.65rem] lg:text-3xl">
                Video que piensa. Seguridad que rinde.
              </h3>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                Las plataformas en la nube y la analítica de video ayudan a detectar incidentes antes, reducir falsas
                alarmas y operar con menos carga para su equipo. Le mostramos cómo encajan en su proyecto.
              </p>
              <div className="pt-1">
                <CardButton to="/#servicios">Explorar video e inteligencia</CardButton>
              </div>
            </div>
            <div className="relative z-10 flex flex-1 items-end justify-center px-6 pb-6 pt-2 sm:px-8 sm:pb-8 lg:items-center lg:justify-end lg:pb-8 lg:pl-0 lg:pr-6">
              <div className="relative h-[min(220px,42vw)] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 sm:h-[min(260px,38vw)] sm:max-w-[320px] lg:h-[min(300px,36vh)] lg:max-w-none lg:w-[min(100%,360px)]">
                <img
                  src={PLACEHOLDER_IMAGES.insightsMain}
                  alt=""
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={300}
                />
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/80 shadow-md sm:min-h-[220px] lg:min-h-0"
          >
            <img
              src={PLACEHOLDER_IMAGES.insightsTrends}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-header via-header/75 to-header/20"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
              <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                Tendencias 2026 en tecnología de seguridad
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Nube, integración y operación unificada: qué evaluar al actualizar sus sistemas.
              </p>
              <CardButton to="/#contacto" variant="outline">
                Solicitar asesoría
              </CardButton>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-muted p-6 shadow-sm sm:min-h-[220px] sm:p-7 lg:min-h-0"
          >
            <img
              src={PLACEHOLDER_IMAGES.insightsInfra}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand/10 sm:h-48 sm:w-48"
              aria-hidden
            />
            <div className="relative z-10">
              <h3 className="text-lg font-bold leading-snug text-header sm:text-xl">
                Infraestructura crítica y continuidad
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                Cableado, redes y respaldo para entornos que no pueden detenerse: enfoque proactivo y soporte cercano.
              </p>
            </div>
            <Link
              to="/#servicios"
              className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-header"
            >
              Ver línea de servicios
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
