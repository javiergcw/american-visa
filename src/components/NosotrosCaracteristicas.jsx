import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionDivider from './SectionDivider.jsx'

const CARACTERISTICAS = [
  {
    id: 'exp',
    title: 'Experiencia que respalda cada proyecto',
    body: 'Años integrando alarmas, video, accesos y redes para empresas y hogares. Le asesoramos con criterio técnico y cumplimiento, sin sobredimensionar ni dejar cabos sueltos. Conocemos los retos del entorno colombiano y las exigencias de proyectos que también operan en el exterior.',
    image: '/servicio-cliente.webp',
    alt: 'Equipo American Visa Technology atendiendo al cliente',
  },
  {
    id: 'sol',
    title: 'Soluciones completas a su medida',
    body: 'Diseñamos el sistema end-to-end: desde el levantamiento en sitio hasta la puesta en marcha y el soporte. Una sola conversación para cableado, equipos, integración y capacitación. Documentamos, probamos y entregamos con criterios claros para que su equipo sepa operar y escalar con tranquilidad.',
    image: '/hero3d.png',
    alt: 'Ilustración de sistemas de seguridad electrónica',
  },
  {
    id: 'opt',
    title: 'Tecnología actualizada y soporte cercano',
    body: 'Trabajamos con marcas líderes y mantenemos sus instalaciones en el tiempo: mantenimiento, actualizaciones y respuesta cuando más lo necesita. Planes de servicio adaptados a su ritmo operativo, con seguimiento cercano y comunicación directa con quienes instalaron su sistema.',
    image: '/servicio-cliente.webp',
    alt: 'Soporte y servicio técnico',
  },
]

export default function NosotrosCaracteristicas() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="nosotros-valores"
      className="scroll-mt-36 bg-surface"
      aria-label="Características de American Visa Technology"
    >
      <SectionDivider />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-8 lg:pt-8 lg:pb-12 xl:gap-16">
        <div className="min-w-0 w-full flex-1 lg:max-w-xl lg:shrink">
          <h2 className="section-heading-h2-compact">
            De la complejidad a la tranquilidad en su seguridad
          </h2>
          <p className="section-lead-tight mt-4 max-w-prose text-slate-500">
            Tres formas en las que acompañamos a empresas y hogares en Colombia y en el exterior.
          </p>

          <ul className="mt-10 space-y-8 sm:space-y-9 lg:mt-12" role="tablist" aria-label="Ventajas">
            {CARACTERISTICAS.map((item, i) => {
              const isActive = active === i
              return (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="relative w-full rounded-md py-1 pl-5 text-left transition-[color] sm:py-1.5 sm:pl-6"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nosotros-feature-bar"
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-header sm:top-2.5 sm:bottom-2.5"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={`block transition-[color,font-weight,letter-spacing] duration-300 ease-out ${
                        isActive
                          ? 'text-[1.05rem] font-semibold leading-snug tracking-tight text-header sm:text-lg sm:font-bold'
                          : 'text-[0.9375rem] font-normal leading-snug tracking-normal text-slate-400/80 hover:text-slate-500 sm:text-base'
                      }`}
                    >
                      {item.title}
                    </span>
                    {isActive ? (
                      <motion.p
                        id={`panel-${item.id}`}
                        role="tabpanel"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-3 text-sm font-normal leading-[1.75] text-slate-600 sm:text-[0.9375rem] sm:leading-relaxed"
                      >
                        {item.body}
                      </motion.p>
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-12 flex justify-center sm:mt-14 lg:justify-start">
            <Link
              to="/#contacto"
              className="btn-gold btn-gold--default inline-flex items-center justify-center gap-1.5"
              aria-label="Ir al formulario de contacto"
            >
              <svg className="h-4 w-4 shrink-0 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Inicie su proyecto con nosotros
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[min(100%,22rem)] shrink-0 overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-md shadow-slate-200/40 ring-1 ring-slate-100/80 sm:max-w-[min(100%,26rem)] lg:mx-0 lg:mt-2 lg:max-w-[min(100%,32rem)] xl:max-w-[min(100%,38rem)]">
          <div className="relative aspect-4/3 w-full min-h-[240px] sm:min-h-[280px] lg:aspect-3/4 lg:min-h-[min(28rem,calc(100svh-12rem))] lg:max-h-[min(40rem,85svh)] xl:min-h-[min(32rem,calc(100svh-10rem))] xl:max-h-[min(44rem,88svh)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={CARACTERISTICAS[active].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={CARACTERISTICAS[active].image}
                  alt={CARACTERISTICAS[active].alt}
                  className="h-full w-full object-cover object-center"
                  loading={active === 0 ? 'eager' : 'lazy'}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-tr from-slate-900/3 via-transparent to-header/4"
                  aria-hidden
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
