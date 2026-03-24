import { motion, useReducedMotion } from 'framer-motion'

/** Logos en /public/marcas — añada aquí nuevos archivos al subirlos */
const MARCAS = [
  { src: '/marcas/samsung.png', name: 'Samsung' },
  { src: '/marcas/hikvision.png', name: 'Hikvision' },
  { src: '/marcas/ezviz.png', name: 'EZVIZ' },
  { src: '/marcas/bosch.png', name: 'Bosch' },
  { src: '/marcas/epcom.png', name: 'Epcom Sycom' },
]

function LogoItem({ marca }) {
  return (
    <div className="flex h-16 w-[min(44vw,11rem)] shrink-0 items-center justify-center px-4 sm:h-18 sm:w-48 sm:px-6 lg:w-52">
      <img
        src={marca.src}
        alt={marca.name}
        className="max-h-10 w-auto max-w-full object-contain object-center opacity-90 transition-[opacity,filter] duration-300 hover:opacity-100 sm:max-h-12"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default function MarcasAliadas() {
  const reduceMotion = useReducedMotion()
  const loop = !reduceMotion

  return (
    <section
      id="marcas"
      className="scroll-mt-36 border-t border-white/10 bg-marcas-bg py-14 sm:py-16 lg:py-20"
      aria-label="Fabricantes y marcas con las que trabajamos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className="eyebrow-dark">Fabricantes y marcas</p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            Tecnología respaldada por líderes del sector
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mt-10 sm:mt-12"
        >
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-marcas-panel py-6 ring-1 ring-white/10 sm:py-8 hover:[&_.marquee-logos-track]:[animation-play-state:paused]">
            {/* Degradados en los bordes (mantiene look “carrusel”) */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-marcas-panel to-transparent sm:w-14"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-marcas-panel to-transparent sm:w-14"
              aria-hidden
            />

            {loop ? (
              <div className="marquee-logos-track flex w-max animate-marquee-logos">
                {[...MARCAS, ...MARCAS].map((marca, i) => (
                  <LogoItem key={`${marca.name}-${i}`} marca={marca} />
                ))}
              </div>
            ) : (
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 px-4 py-2 sm:gap-x-10">
                {MARCAS.map((marca) => (
                  <li key={marca.name}>
                    <LogoItem marca={marca} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="sr-only">
            {MARCAS.map((m) => (
              <li key={m.name}>{m.name}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
