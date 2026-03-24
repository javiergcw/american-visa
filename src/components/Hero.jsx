import { motion } from 'framer-motion'
import HeroBannerCarousel from './HeroBannerCarousel.jsx'
import NosotrosCaracteristicas from './NosotrosCaracteristicas.jsx'

export default function Hero() {
  return (
    <>
      <HeroBannerCarousel />

      <section
        id="nosotros"
        className="relative z-1 -mt-px w-full scroll-mt-36 bg-muted"
      >
        {/* Acento fino bajo el banner; bloque en tono muted (alineado con stats, sin franja blanca a la izquierda) */}
        <div className="h-0.5 w-full bg-linear-to-r from-header via-brand/80 to-header" aria-hidden />

        {/* Mismo ancho y padding horizontal que Navbar (`max-w-7xl px-4 sm:px-6 lg:px-8`) y NosotrosCaracteristicas */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid w-full min-h-0 gap-0 border-t border-slate-200/80 lg:grid-cols-12 lg:items-stretch">
            {/* Texto: tono corporativo, alineado a la izquierda en desktop */}
            <motion.div
              initial={{ opacity: 1, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center border-b border-slate-200 py-4 sm:py-5 lg:col-span-7 lg:border-b-0 lg:border-r lg:py-6"
            >
              <p className="eyebrow-brand-tight text-left">Nosotros</p>
              <p className="mt-2 max-w-prose text-left section-lead-tight text-slate-700 sm:mt-2.5">
                <strong className="font-semibold text-header">American Visa Technology S.A.S</strong> es una empresa
                colombiana especializada en seguridad electrónica, con presencia nacional e internacional. Unimos
                experiencia de campo con tecnología de punta para diseñar, instalar y dar soporte a sistemas que
                protegen personas, activos y operaciones.
              </p>
            </motion.div>

            {/* Estadísticas: rejilla seria, bordes cuadrados */}
            <motion.div
              initial={{ opacity: 1, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="grid grid-cols-2 gap-px bg-slate-200 lg:col-span-5 lg:grid-cols-2 lg:grid-rows-2"
            >
              {[
                { value: '15+', label: 'Años en seguridad electrónica' },
                { value: '500+', label: 'Proyectos integrados' },
                { value: '50+', label: 'Clientes corporativos e institucionales' },
                { value: '24/7', label: 'Soporte técnico especializado' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-center bg-white px-2.5 py-2.5 text-center sm:px-4 sm:py-3"
                >
                  <p className="font-mono text-xl font-bold tabular-nums text-header sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-[0.6rem] font-medium uppercase leading-tight tracking-wide text-slate-600 sm:text-[0.65rem]">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <NosotrosCaracteristicas />
    </>
  )
}
