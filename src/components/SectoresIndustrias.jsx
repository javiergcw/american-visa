import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Imágenes de ejemplo (sustituir por fotos propias en /public).
 */
const SECTORES = [
  {
    id: 'finanzas',
    label: 'Finanzas y banca',
    to: '/#contacto',
    image: 'https://picsum.photos/seed/av-sector-fin/720/720',
    alt: 'Ejemplo: entorno seguro en sector financiero',
  },
  {
    id: 'retail',
    label: 'Retail',
    to: '/#contacto',
    image: 'https://picsum.photos/seed/av-sector-retail/720/720',
    alt: 'Ejemplo: espacio comercial o retail',
  },
  {
    id: 'datos',
    label: 'Centros de datos',
    to: '/#contacto',
    image: 'https://picsum.photos/seed/av-sector-dc/720/720',
    alt: 'Ejemplo: infraestructura de centro de datos',
  },
  {
    id: 'oficinas',
    label: 'Oficinas corporativas',
    to: '/#contacto',
    image: 'https://picsum.photos/seed/av-sector-office/720/720',
    alt: 'Ejemplo: edificio de oficinas',
  },
]

export default function SectoresIndustrias() {
  return (
    <section
      id="sectores"
      className="scroll-mt-36 border-t border-slate-200/80 bg-surface section-y"
      aria-label="Sectores que atendemos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-50px' }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow">Soluciones de seguridad empresarial</p>
          <h2 className="section-heading-h2 mt-3">
            Adaptadas a su entorno empresarial
          </h2>
          <p className="section-lead mt-5">
            Nuestra experiencia ayudando a resolver retos de seguridad en distintos sectores nos permite entender los
            riesgos particulares que su organización enfrenta cada día.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 1, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6 xl:gap-8"
        >
          {SECTORES.map((item, idx) => (
            <li key={item.id}>
              <motion.div
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-slate-200 shadow-sm ring-1 ring-slate-200/80">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 w-full">
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold/85 sm:text-base"
                  >
                    <span className="text-gold" aria-hidden>
                      →
                    </span>
                    {item.label}
                  </Link>
                  <div className="mt-3 h-px w-full bg-slate-200" aria-hidden />
                </div>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
