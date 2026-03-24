import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { getUserInitials, PANEL_SESSION_USER } from '../data/panelSession.js'

const nav = [
  { to: '/panel', label: 'Inicio', end: true },
  { to: '/panel/clientes', label: 'Clientes' },
  { to: '/panel/productos', label: 'Productos' },
  { to: '/panel/propuestas', label: 'Propuestas' },
]

const linkClass = 'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors'
const linkIdle = 'text-slate-300 hover:bg-white/10 hover:text-white'
const linkActive = 'bg-gold/20 text-gold shadow-inner shadow-black/20'

export default function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const initials = getUserInitials(PANEL_SESSION_USER.name)

  return (
    <div className="flex min-h-screen bg-slate-100 text-ink">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Cerrar menú"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh max-h-dvh w-64 flex-col overflow-hidden border-r border-white/10 bg-header text-white shadow-xl transition-transform lg:sticky lg:top-0 lg:h-dvh lg:max-h-dvh lg:w-60 lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex shrink-0 flex-col items-center gap-2 border-b border-white/10 px-4 py-4">
          <Link
            to="/panel"
            onClick={() => setSidebarOpen(false)}
            className="flex w-full justify-center rounded-md outline-none ring-offset-2 ring-offset-header transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gold/70"
          >
            <img
              src="/logo.png"
              alt="American Visa Technology SAS"
              className="h-auto max-h-24 w-full max-w-[200px] object-contain object-center"
            />
          </Link>
          <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">Panel comercial</p>
        </div>

        <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden overscroll-contain p-3" aria-label="Panel">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `${linkClass} ${isActive ? linkActive : linkIdle}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-md bg-white/5 px-2 py-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-header shadow-md"
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{PANEL_SESSION_USER.name}</p>
              <p className="truncate text-xs text-slate-400">{PANEL_SESSION_USER.email}</p>
              <span className="mt-1 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                {PANEL_SESSION_USER.role}
              </span>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              ← Sitio web público
            </Link>
            <Link
              to="/login"
              className="block rounded-md px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-header px-4 text-white shadow-md lg:hidden">
          <button
            type="button"
            className="rounded-md border border-white/20 p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Panel</p>
            <p className="truncate text-[11px] text-slate-400">{PANEL_SESSION_USER.name}</p>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
