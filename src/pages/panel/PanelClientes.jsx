import { useMemo, useState } from 'react'
import { usePanelData } from '../../context/usePanelData.js'
import Modal from '../../components/panel/Modal.jsx'
import { getAvatarColors, getCompanyInitials } from '../../utils/clientCardAvatar.js'

/** Ámbito del cuadro de búsqueda */
const SCOPE_ALL = 'all'
const SCOPE_NAME = 'name'
const SCOPE_EMAIL = 'email'
const SCOPE_PHONE = 'phone'
const SCOPE_COMPANY = 'company'

const searchScopes = [
  {
    id: SCOPE_ALL,
    label: 'Todo',
    hint: 'Busca en nombre, correo, teléfono y empresa a la vez.',
    placeholder: 'Nombre, correo, teléfono o empresa…',
  },
  {
    id: SCOPE_NAME,
    label: 'Nombre',
    hint: 'Solo coincide con el nombre del contacto.',
    placeholder: 'Ej. María, director comercial…',
  },
  {
    id: SCOPE_EMAIL,
    label: 'Correo',
    hint: 'Solo coincide con el correo electrónico.',
    placeholder: 'Ej. ventas@empresa.com',
  },
  {
    id: SCOPE_PHONE,
    label: 'Teléfono',
    hint: 'Ignora espacios y guiones; puede buscar por parte del número.',
    placeholder: 'Ej. 601, +57, 555…',
  },
  {
    id: SCOPE_COMPANY,
    label: 'Empresa',
    hint: 'Solo coincide con el nombre de la empresa.',
    placeholder: 'Ej. Banco, Retail, Conjunto…',
  },
]

/** Refinado de lista (además del texto de búsqueda) */
const REFINE_ALL = 'all'
const REFINE_WITH_COMPANY = 'with_company'
const REFINE_NO_COMPANY = 'no_company'
const REFINE_WITH_PHONE = 'with_phone'
const REFINE_NO_PHONE = 'no_phone'

const refineOptions = [
  { id: REFINE_ALL, label: 'Todos los contactos (sin refinar por datos)' },
  { id: REFINE_WITH_COMPANY, label: 'Solo los que tienen empresa' },
  { id: REFINE_NO_COMPANY, label: 'Solo los que no tienen empresa' },
  { id: REFINE_WITH_PHONE, label: 'Solo los que tienen teléfono' },
  { id: REFINE_NO_PHONE, label: 'Solo los que no tienen teléfono' },
]

function normalizeDigits(s) {
  return String(s || '').replace(/\D/g, '')
}

function matchesSearch(client, q, scope) {
  if (!q.trim()) return true
  const raw = q.trim()
  const lower = raw.toLowerCase()
  const qDigits = normalizeDigits(raw)

  if (scope === SCOPE_PHONE) {
    const phoneDigits = normalizeDigits(client.phone)
    if (qDigits.length > 0) return phoneDigits.includes(qDigits)
    return String(client.phone || '').toLowerCase().includes(lower)
  }

  const fieldMap = {
    [SCOPE_ALL]: [client.name, client.email, client.company, client.phone],
    [SCOPE_NAME]: [client.name],
    [SCOPE_EMAIL]: [client.email],
    [SCOPE_COMPANY]: [client.company],
  }
  const fields = fieldMap[scope] || fieldMap[SCOPE_ALL]
  return fields.filter(Boolean).some((f) => String(f).toLowerCase().includes(lower))
}

function matchesRefine(client, refineId) {
  switch (refineId) {
    case REFINE_WITH_COMPANY:
      return Boolean(client.company?.trim())
    case REFINE_NO_COMPANY:
      return !client.company?.trim()
    case REFINE_WITH_PHONE:
      return Boolean(client.phone?.trim())
    case REFINE_NO_PHONE:
      return !client.phone?.trim()
    default:
      return true
  }
}

export default function PanelClientes() {
  const { clients, addClient, updateClient } = usePanelData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [search, setSearch] = useState('')
  const [searchScope, setSearchScope] = useState(SCOPE_ALL)
  const [refine, setRefine] = useState(REFINE_ALL)

  const scopeMeta = searchScopes.find((s) => s.id === searchScope) ?? searchScopes[0]

  function resetForm() {
    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
  }

  function closeModal() {
    setOpen(false)
    setEditingId(null)
    resetForm()
  }

  function openCreateModal() {
    resetForm()
    setEditingId(null)
    setOpen(true)
  }

  function openEditModal(c) {
    setEditingId(c.id)
    setName(c.name)
    setEmail(c.email)
    setPhone(c.phone ?? '')
    setCompany(c.company ?? '')
    setOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (editingId) {
      updateClient(editingId, { name, email, phone, company })
    } else {
      addClient({ name, email, phone, company })
    }
    closeModal()
  }

  function clearAllFilters() {
    setSearch('')
    setSearchScope(SCOPE_ALL)
    setRefine(REFINE_ALL)
  }

  const filtered = useMemo(() => {
    return clients.filter((c) => matchesSearch(c, search, searchScope) && matchesRefine(c, refine))
  }, [clients, search, searchScope, refine])

  return (
    <div className="min-h-0">
      <div className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-header sm:text-3xl">Clientes</h1>
          <p className="mt-1 text-sm text-slate-600">Contactos y empresas para propuestas</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-gold/50 bg-gold px-5 py-2.5 text-sm font-bold text-header shadow-sm transition hover:bg-gold/90 hover:shadow"
        >
          Crear cliente
        </button>
      </div>

      <div className="mt-6 space-y-4 rounded-md border border-slate-200 bg-[#f5f6f8] p-4 shadow-sm sm:p-5">
        {/* 1. Dónde buscar */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-header">¿Dónde buscar?</p>
          <p className="mt-0.5 text-xs text-slate-500">Elija el campo; así la búsqueda es más precisa.</p>
          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {searchScopes.map((s) => {
              const on = searchScope === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSearchScope(s.id)}
                  className={`shrink-0 rounded-md border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    on
                      ? 'border-header bg-header text-gold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand/40 hover:text-header'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Caja de búsqueda */}
        <div>
          <label htmlFor="client-search" className="sr-only">
            Texto a buscar
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              id="client-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={scopeMeta.placeholder}
              className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-header shadow-sm placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
              autoComplete="off"
            />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{scopeMeta.hint}</p>
        </div>

        {/* 3. Mostrar solo (refinar por tipo de dato) */}
        <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="client-refine" className="shrink-0 text-xs font-bold uppercase tracking-wide text-header">
            Mostrar solo
          </label>
          <select
            id="client-refine"
            value={refine}
            onChange={(e) => setRefine(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-header shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
          >
            {refineOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-3">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-brand">{filtered.length}</span> de {clients.length} contacto
            {clients.length !== 1 ? 's' : ''}
          </p>
          {(search.trim() || searchScope !== SCOPE_ALL || refine !== REFINE_ALL) && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-slate-50"
            >
              Limpiar búsqueda y refinado
            </button>
          )}
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">No hay clientes</p>
          <p className="mt-1 text-xs text-slate-500">Pulse “Crear cliente” para añadir el primero.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-md border border-slate-200 bg-white py-14 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">Ningún contacto coincide con lo que eligió</p>
          <p className="mt-1 text-xs text-slate-500">Pruebe otro campo en “¿Dónde buscar?” o cambie “Mostrar solo”.</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-4 text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Limpiar todo y ver la lista completa
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => {
            const initials = getCompanyInitials(c.company, c.name)
            const colors = getAvatarColors(c.company || c.name || c.id)
            return (
              <li key={c.id}>
                <article className="flex aspect-square flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:border-brand/35 hover:shadow-md">
                  <div className="flex flex-1 flex-col items-center justify-center border-b border-slate-100 bg-linear-to-b from-slate-50 to-white px-4 py-5">
                    <div
                      className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full text-xl font-bold shadow-md ring-2 ring-white"
                      style={{ backgroundColor: colors.bg, color: colors.fg }}
                      aria-hidden
                    >
                      {initials}
                    </div>
                    {c.company?.trim() ? (
                      <p className="mt-3 line-clamp-2 text-center text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {c.company.trim()}
                      </p>
                    ) : (
                      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Sin empresa
                      </p>
                    )}
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col justify-center gap-1 px-4 py-3 text-center">
                    <h2 className="line-clamp-2 text-sm font-bold leading-snug text-header">{c.name}</h2>
                    <p className="break-all text-xs leading-relaxed text-slate-600 line-clamp-2">{c.email}</p>
                    {c.phone?.trim() && (
                      <p className="text-[11px] text-slate-500">{c.phone.trim()}</p>
                    )}
                  </div>
                  <div className="shrink-0 border-t border-slate-100 px-3 pb-3 pt-0">
                    <button
                      type="button"
                      onClick={() => openEditModal(c)}
                      className="w-full rounded-md border border-slate-200 bg-white py-2 text-xs font-semibold text-brand transition hover:border-brand/40 hover:bg-brand/5"
                    >
                      Editar
                    </button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}

      <Modal open={open} title={editingId ? 'Editar cliente' : 'Nuevo cliente'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="c-name">
              Nombre
            </label>
            <input
              id="c-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="c-email">
              Correo
            </label>
            <input
              id="c-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="c-phone">
              Teléfono
            </label>
            <input
              id="c-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="c-company">
              Empresa <span className="font-normal text-slate-500">(para el avatar)</span>
            </label>
            <input
              id="c-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Ej. Banco Andino S.A."
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-header px-4 py-2 text-sm font-semibold text-gold transition hover:bg-header/90"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
