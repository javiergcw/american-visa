import { Link } from 'react-router-dom'
import { LOGO_SRC, WA_BASE, WA_PHONE_DISPLAY, CONTACT_EMAIL } from '../brand.js'

const linkClass = 'text-sm text-slate-400 transition-colors hover:text-white'

const COL_NAV = {
  title: 'Navegación',
  links: [
    { label: 'Inicio', to: '/#inicio' },
    { label: 'Nosotros', to: '/#nosotros' },
    { label: 'Servicios', to: '/#servicios' },
    { label: 'Novedades', to: '/#insights' },
    { label: 'Contacto', to: '/#contacto' },
  ],
}

const COL_SERVICIOS = {
  title: 'Servicios',
  links: [
    { label: 'Cableado estructurado', to: '/#servicios' },
    { label: 'Redes y conectividad', to: '/#servicios' },
    { label: 'Video vigilancia y CCTV', to: '/#servicios' },
    { label: 'Control de acceso', to: '/#servicios' },
    { label: 'Telefonía y comunicaciones', to: '/#servicios' },
  ],
}

const COL_INDUSTRIAS = {
  title: 'Industrias',
  links: [
    { label: 'Finanzas y banca', to: '/#sectores' },
    { label: 'Retail', to: '/#sectores' },
    { label: 'Centros de datos', to: '/#sectores' },
    { label: 'Oficinas corporativas', to: '/#sectores' },
  ],
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="eyebrow-muted-dark">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.label}>
            <Link to={item.to} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({ href, label, children, sameTab }) {
  return (
    <a
      href={href}
      {...(sameTab ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/90 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-header text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex rounded-md bg-white px-4 py-2.5 shadow-sm transition-opacity hover:opacity-95 sm:px-5 sm:py-3"
            >
              <img
                src={LOGO_SRC}
                alt="American Visa Technology S.A.S"
                className="h-10 w-auto max-w-[220px] object-contain object-left sm:h-11"
                width={220}
                height={48}
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Integración de sistemas de seguridad electrónica, redes y comunicaciones para organizaciones en Colombia y
              proyectos con alcance internacional. Asesoría, instalación y soporte con criterio técnico.
            </p>
            <div className="mt-5 h-px w-14 bg-gold/70" aria-hidden />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            <FooterColumn {...COL_NAV} />
            <FooterColumn {...COL_SERVICIOS} />
            <FooterColumn {...COL_INDUSTRIAS} />
            <div>
              <h3 className="eyebrow-muted-dark">Contacto</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={WA_BASE} className="transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                    {WA_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <Link to="/privacidad" className="transition-colors hover:text-white">
                    Privacidad de datos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:gap-8">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {year} American Visa Technology S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <SocialIcon href="https://www.linkedin.com/company/grupo-american-visa" label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={WA_BASE} label="WhatsApp">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.571a.75.75 0 00.93.898l5.878-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.92-1.328l-.353-.21-3.656.944.976-3.555-.23-.366A9.72 9.72 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={`mailto:${CONTACT_EMAIL}`} label="Correo electrónico" sameTab>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/10 pt-8 text-xs text-slate-500"
          aria-label="Enlaces legales"
        >
          <Link to="/privacidad" className="transition-colors hover:text-slate-300">
            Política de privacidad
          </Link>
          <span className="hidden text-white/15 sm:inline" aria-hidden>
            |
          </span>
          <Link to="/#contacto" className="transition-colors hover:text-slate-300">
            Preferencias y consultas
          </Link>
        </nav>
      </div>
    </footer>
  )
}
