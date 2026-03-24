import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LOGO_SRC, CONTACT_EMAIL } from '../brand.js'
import NavbarContactCta from './NavbarContactCta.jsx'
import { useScrollSpy } from '../hooks/useScrollSpy.js'

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Contacto', id: 'contacto' },
]

const NAV_SECTION_IDS = ['inicio', 'nosotros', 'servicios', 'contacto']

/** Altura aproximada del header de dos filas + margen para scroll spy */
const HEADER_SCROLL_OFFSET = 140

/** Tiempo sin scroll antes de volver a mostrar la fila de secciones (Inicio, Nosotros…) */
const NAV_BOTTOM_REVEAL_MS = 800

function Divider() {
  return <span className="hidden h-3.5 w-px shrink-0 bg-white/20 sm:block" aria-hidden />
}

function IconGlobe(props) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  )
}

function IconUserCircle(props) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function IconChevronDown(props) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

const LANG_OPTIONS = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
]

/**
 * Dropdown de idioma: solo UI. La opción activa se refleja en el botón; aún no hay cambio de locale/i18n.
 */
function NavLanguageDropdown({ className = '', menuAlign = 'end' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  /** Código mostrado como “seleccionado” (sin traducir el sitio) */
  const [visualCode, setVisualCode] = useState('es')
  const wrapRef = useRef(null)

  const current = LANG_OPTIONS.find((o) => o.code === visualCode) ?? LANG_OPTIONS[0]

  useEffect(() => {
    if (!menuOpen) return
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10 sm:gap-2 sm:px-2.5 sm:text-xs"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-label={`Idioma: ${current.label}. Abrir opciones`}
        title="La traducción del sitio estará disponible próximamente"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <IconGlobe className="h-3.5 w-3.5 shrink-0 text-slate-400 sm:h-4 sm:w-4" />
        <span className="text-white">{current.short}</span>
        <IconChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform sm:h-4 sm:w-4 ${menuOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {menuOpen && (
        <ul
          role="listbox"
          aria-label="Idioma del sitio"
          className={`absolute z-70 mt-1 min-w-42 rounded-lg border border-white/15 bg-header py-1 shadow-xl shadow-black/40 ${
            menuAlign === 'end' ? 'right-0' : 'left-0'
          }`}
        >
          {LANG_OPTIONS.map((opt) => {
            const selected = opt.code === visualCode
            return (
              <li key={opt.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    selected ? 'bg-white/10 font-semibold text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                  onClick={() => {
                    setVisualCode(opt.code)
                    setMenuOpen(false)
                  }}
                >
                  <span>{opt.label}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{opt.short}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function NavLoginLink({ onNavigate, className }) {
  return (
    <Link
      to="/login"
      className={className}
      aria-label="Iniciar sesión"
      onClick={onNavigate}
    >
      <IconUserCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
    </Link>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [bottomNavVisible, setBottomNavVisible] = useState(true)
  const bottomNavTimerRef = useRef(null)
  const activeId = useScrollSpy(NAV_SECTION_IDS, HEADER_SCROLL_OFFSET)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /** Fila de anclas: se oculta mientras hay scroll; vuelve tras NAV_BOTTOM_REVEAL_MS al parar */
  useEffect(() => {
    const clearTimer = () => {
      if (bottomNavTimerRef.current != null) {
        window.clearTimeout(bottomNavTimerRef.current)
        bottomNavTimerRef.current = null
      }
    }

    const onScroll = () => {
      if (window.scrollY < 4) {
        setBottomNavVisible(true)
        clearTimer()
        return
      }
      setBottomNavVisible(false)
      clearTimer()
      bottomNavTimerRef.current = window.setTimeout(() => {
        setBottomNavVisible(true)
        bottomNavTimerRef.current = null
      }, NAV_BOTTOM_REVEAL_MS)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimer()
    }
  }, [])

  const linkBase =
    'rounded-md px-2.5 py-2 text-[0.8125rem] font-medium leading-tight transition-colors sm:text-sm'
  const linkActive = 'bg-white/10 text-white'
  const linkIdle = 'text-slate-300 hover:bg-white/5 hover:text-white'

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-header text-slate-100 shadow-lg shadow-black/40"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Principal">
        {/* — Fila 1: marca + utilidades (referencia estilo “utility bar”) — */}
        <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
          <Link
            to="/"
            className="flex min-h-0 min-w-0 shrink-0 items-center py-0.5 text-left"
            onClick={() => setOpen(false)}
          >
            <img
              src={LOGO_SRC}
              alt="American Visa Technology S.A.S"
              className="h-11 w-auto max-h-[60px] max-w-[min(100%,320px)] object-contain object-left sm:h-12 md:h-14"
              width={320}
              height={64}
              decoding="async"
            />
          </Link>

          {/* Escritorio: enlaces utilidad + CTA */}
          <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-slate-400 transition-colors hover:text-white sm:text-xs"
            >
              Escríbanos
            </a>
            <Divider />
            <Link
              to="/privacidad"
              className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-slate-400 transition-colors hover:text-white sm:text-xs"
              onClick={() => setOpen(false)}
            >
              Privacidad
            </Link>
            <Divider />
            <NavLanguageDropdown />
            <Divider />
            <NavLoginLink
              onNavigate={() => setOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
            />
            <Divider />
            <NavbarContactCta variant="topbar" onNavigate={() => setOpen(false)} />
          </div>

          {/* Móvil / tablet: CTA compacto + menú */}
          <div className="flex items-center gap-2 lg:hidden">
            <NavbarContactCta
              variant="topbarSm"
              className="inline-flex shrink-0 lg:hidden"
              onNavigate={() => setOpen(false)}
            />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white shadow-sm transition-colors hover:bg-white/10"
              aria-expanded={open}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menú</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Separador + fila 2: se pliegan al hacer scroll; reaparecen al detenerse (solo lg+) */}
        <div
          className={`hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:block ${
            bottomNavVisible ? 'max-h-48 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
          aria-hidden={!bottomNavVisible}
        >
          <div className="border-t border-white/10" />
          <div className="py-3">
            <ul className="flex flex-wrap items-center gap-0.5">
              {navLinks.map((l) => {
                const active = isHome && activeId === l.id
                return (
                  <li key={l.id}>
                    <Link
                      to={`/#${l.id}`}
                      className={`${linkBase} ${active ? linkActive : linkIdle}`}
                      aria-current={active ? 'true' : undefined}
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-header lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 pb-3 text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {CONTACT_EMAIL}
                </a>
                <span className="text-white/25">|</span>
                <Link
                  to="/privacidad"
                  className="transition-colors hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Política de privacidad
                </Link>
                <span className="text-white/25">|</span>
                <NavLanguageDropdown menuAlign="start" />
                <span className="text-white/25">|</span>
                <NavLoginLink
                  onNavigate={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                />
              </div>
              <ul className="flex flex-col py-2">
                {navLinks.map((l) => {
                  const active = isHome && activeId === l.id
                  return (
                    <li key={l.id}>
                      <Link
                        to={`/#${l.id}`}
                        className={`block rounded-lg px-3 py-3 text-base font-medium ${
                          active ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5 hover:text-white'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="pb-2 pt-1">
                <NavbarContactCta variant="menu" onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
