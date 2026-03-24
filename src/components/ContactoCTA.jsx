import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WA_BASE, WA_PHONE, CONTACT_SIDE_IMAGE } from '../brand.js'
import {
  COTIZAR_DESDE_HERO,
  COTIZAR_INTERES_ORDER,
  COTIZAR_QUERY,
  normalizeCotizarSlug,
} from '../data/cotizarDesdeHero.js'

const TIPOS = [
  { value: 'Residencial', label: 'Residencial' },
  { value: 'Comercio / retail', label: 'Comercio / retail' },
  { value: 'Industria / bodegas', label: 'Industria / bodegas' },
  { value: 'Conjunto / edificio', label: 'Conjunto / edificio' },
  { value: 'Oficinas / corporativo', label: 'Oficinas / corporativo' },
  { value: 'Otro', label: 'Otro' },
]

const inputBase =
  'mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-header focus:outline-none focus:ring-2 focus:ring-header/25 hover:border-slate-400'

const labelClass = 'block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600'

export default function ContactoCTA() {
  const [searchParams] = useSearchParams()
  const urlInteresRef = useRef(null)

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [interes, setInteres] = useState('general')
  const [tipo, setTipo] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const slug = normalizeCotizarSlug(searchParams.get(COTIZAR_QUERY))
    setInteres(slug)
    if (urlInteresRef.current !== slug) {
      urlInteresRef.current = slug
      setMensaje(COTIZAR_DESDE_HERO[slug].hint)
    }
  }, [searchParams])

  function handleSubmit(e) {
    e.preventDefault()
    const motivoLabel = COTIZAR_DESDE_HERO[interes].label
    const lines = [
      'Hola, solicito información desde la web de American Visa Technology.',
      `Motivo / cotización: ${motivoLabel}`,
      nombre.trim() && `Nombre: ${nombre.trim()}`,
      telefono.trim() && `Teléfono: ${telefono.trim()}`,
      tipo && `Tipo de proyecto: ${tipo}`,
      mensaje.trim() && `Detalle: ${mensaje.trim()}`,
    ].filter(Boolean)
    const text = lines.join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="scroll-mt-36 bg-surface section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading-h2">Contacto</h2>
          <p className="section-lead mt-3">
            Déjenos sus datos y abrimos conversación por WhatsApp con su mensaje ya redactado. También puede escribirnos
            directo o por correo.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-header" aria-hidden />
        </div>

        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {/* Imagen: misma altura que el formulario en desktop */}
          <motion.div
            initial={{ opacity: 1, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="order-1 flex min-h-[260px] flex-col lg:order-2 lg:min-h-0 lg:h-full"
          >
            <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-md lg:min-h-0">
              <img
                src={CONTACT_SIDE_IMAGE}
                alt="Servicio al cliente American Visa Technology"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
              />
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.form
            initial={{ opacity: 1, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="relative order-2 flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white p-6 shadow-md sm:p-8 lg:order-1"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-header" aria-hidden />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="contact-nombre" className={labelClass}>
                  Nombre
                </label>
                <input
                  id="contact-nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={inputBase}
                  placeholder="Su nombre o empresa"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="contact-telefono" className={labelClass}>
                  Teléfono
                </label>
                <input
                  id="contact-telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className={inputBase}
                  placeholder="Ej. 300 123 4567"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-interes" className={labelClass}>
                ¿Qué desea cotizar o consultar?
              </label>
              <select
                id="contact-interes"
                name="interes"
                value={interes}
                onChange={(e) => {
                  const slug = normalizeCotizarSlug(e.target.value)
                  setInteres(slug)
                  setMensaje(COTIZAR_DESDE_HERO[slug].hint)
                }}
                className={`${inputBase} appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                }}
              >
                {COTIZAR_INTERES_ORDER.map((key) => (
                  <option key={key} value={key}>
                    {COTIZAR_DESDE_HERO[key].label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Si llegó desde el inicio, este campo coincide con el enlace elegido; puede modificarlo antes de enviar.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-tipo" className={labelClass}>
                Tipo de proyecto
              </label>
              <select
                id="contact-tipo"
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className={`${inputBase} appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                }}
              >
                <option value="">Tipo de proyecto (opcional)</option>
                {TIPOS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-mensaje" className={labelClass}>
                Mensaje
              </label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className={`${inputBase} resize-y`}
                placeholder="Breve descripción: ubicación, cantidad de puntos, urgencia…"
              />
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-md border border-header/90 bg-header py-3.5 text-sm font-semibold text-white shadow-sm transition-[background-color,box-shadow] hover:bg-header/92 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-header"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.571a.75.75 0 00.93.898l5.878-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.92-1.328l-.353-.21-3.656.944.976-3.555-.23-.366A9.72 9.72 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              Enviar por WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              Al enviar, se abrirá WhatsApp con el número{' '}
              <span className="font-mono font-medium text-slate-600">+{WA_PHONE}</span> y el texto listo para enviar.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
