import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const VIDEO_SRC = '/220941.mp4'

export default function CtaInline() {
  return (
    <section
      className="relative isolate flex min-h-[min(58vh,640px)] items-center overflow-hidden border-y border-slate-200/60 py-24 sm:min-h-[min(52vh,600px)] sm:py-28 lg:min-h-[min(50vh,680px)] lg:py-32"
      aria-label="Llamada a la acción"
    >
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="rounded-md border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/15 sm:p-8"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex w-full flex-col items-center gap-2">
              
              <div className="w-full">
                <h2 className="text-xl font-bold text-ink sm:text-2xl">
                  ¿Necesita una cotización para su proyecto?
                </h2>
                <p className="mt-2 section-lead-tight text-slate-600">
                  Cuéntenos su requerimiento: alarmas, video, redes o control de acceso. Le respondemos con rapidez.
                </p>
              </div>
            </div>

            <Link
              to="/#contacto"
              className="btn-gold btn-gold--default mt-6 w-fit shrink-0 sm:mt-7"
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
              Contáctanos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
