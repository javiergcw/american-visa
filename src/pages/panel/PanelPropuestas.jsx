import { useMemo, useState } from 'react'
import { usePanelData } from '../../context/usePanelData.js'
import Modal from '../../components/panel/Modal.jsx'
import { PROPOSAL_STATUS_ORDER } from '../../context/panelConstants.js'
import { formatCop } from '../../utils/money.js'
import { getAvatarColors, getCompanyInitials } from '../../utils/clientCardAvatar.js'
import { isProposalProductLine, wrapProposalItemsWithDefaults } from '../../utils/proposalLines.js'
import { normalizeProductTemplate } from '../../data/productTemplates.js'

function publicProposalUrl(id) {
  return `${window.location.origin}/propuesta/${id}`
}

const SCOPE_ALL = 'all'
const SCOPE_TITLE = 'title'
const SCOPE_CONTACT = 'contact'
const SCOPE_COMPANY = 'company'
const SCOPE_AMOUNT = 'amount'

const searchScopes = [
  { id: SCOPE_ALL, label: 'Todo', placeholder: 'Título, contacto, empresa, importe…', hint: 'Busca en el título, datos del cliente y total.' },
  { id: SCOPE_TITLE, label: 'Propuesta', placeholder: 'Nombre de la propuesta…', hint: 'Solo el título interno de la propuesta.' },
  { id: SCOPE_CONTACT, label: 'Contacto', placeholder: 'Nombre del contacto…', hint: 'Persona vinculada al cliente.' },
  { id: SCOPE_COMPANY, label: 'Empresa', placeholder: 'Nombre de la empresa…', hint: 'Razón social guardada en el cliente.' },
  { id: SCOPE_AMOUNT, label: 'Importe', placeholder: 'Ej. 5000000', hint: 'Números del valor total en pesos.' },
]

function normalizeDigits(s) {
  return String(s || '').replace(/\D/g, '')
}

function proposalMatchesSearch(p, q, scope, getClient) {
  if (!q.trim()) return true
  const raw = q.trim()
  const lower = raw.toLowerCase()
  const client = getClient(p.clientId)
  const qDigits = normalizeDigits(raw)

  if (scope === SCOPE_AMOUNT) {
    const totalStr = String(Number(p.total) || 0)
    if (qDigits.length > 0) return totalStr.includes(qDigits)
    return totalStr.includes(lower)
  }

  if (scope === SCOPE_TITLE) {
    return String(p.title || '').toLowerCase().includes(lower)
  }
  if (scope === SCOPE_CONTACT) {
    return String(client?.name || '').toLowerCase().includes(lower)
  }
  if (scope === SCOPE_COMPANY) {
    return String(client?.company || '').toLowerCase().includes(lower)
  }

  const haystack = [
    p.title,
    client?.name,
    client?.company,
    client?.email,
    String(p.total),
    ...p.items.map((i) => i.name),
  ]
  return haystack.filter(Boolean).some((f) => String(f).toLowerCase().includes(lower))
}

function Field({ label, children, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-0.5 min-w-0">{children}</div>
    </div>
  )
}

function ProposalCard({ proposal, getClient, onStatusChange, onCopyLink }) {
  const [expanded, setExpanded] = useState(false)
  const client = getClient(proposal.clientId)
  const dateStr = new Date(proposal.createdAt).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const companyLine = client?.company?.trim() || '—'
  const contactName = client?.name ?? 'Sin cliente'
  const initials = getCompanyInitials(client?.company, client?.name || 'P')
  const colors = getAvatarColors(client?.company || client?.name || proposal.id)
  const productLines = proposal.items.filter(isProposalProductLine)
  const itemsPreview = productLines
    .slice(0, 2)
    .map((i) => `${i.quantity}× ${i.name}`)
    .join(' · ')
  const itemsExtra = productLines.length > 2 ? ` +${productLines.length - 2}` : ''

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:border-brand/35 hover:shadow-md">
      <div className="h-0.5 bg-gold/90" aria-hidden />
      <div className="p-3">
        <div className="mb-3 flex items-start gap-2 border-b border-slate-100 pb-3 sm:gap-3">
          <div
            className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-2 ring-slate-100"
            style={{ backgroundColor: colors.bg, color: colors.fg }}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <Field label="Propuesta">
              <p className="text-sm font-bold leading-snug text-header line-clamp-2">{proposal.title || 'Sin título'}</p>
            </Field>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-0.5 shrink-0 rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:border-brand/30 hover:bg-slate-50 hover:text-header"
            aria-expanded={expanded}
            aria-label={expanded ? 'Contraer tarjeta' : 'Expandir tarjeta'}
          >
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="min-w-0 space-y-2">
          <Field label="Empresa">
            <p className="text-xs font-medium text-brand line-clamp-2">{companyLine}</p>
          </Field>
          {expanded && (
            <>
              <Field label="Contacto">
                <p className="text-xs text-slate-800">{contactName}</p>
              </Field>
              {client?.email?.trim() && (
                <Field label="Correo">
                  <p className="break-all text-[11px] text-slate-600 line-clamp-2">{client.email.trim()}</p>
                </Field>
              )}
            </>
          )}
          <Field label="Importe total">
            <p className="text-sm font-bold text-brand">{formatCop(proposal.total)}</p>
          </Field>
          {expanded && (
            <>
              <Field label="Productos / líneas">
                <p className="text-[11px] leading-relaxed text-slate-600">
                  <span className="font-semibold text-header">{productLines.length}</span> línea
                  {productLines.length !== 1 ? 's' : ''}
                  {itemsPreview && (
                    <>
                      {' · '}
                      <span className="line-clamp-2">{itemsPreview}</span>
                      {itemsExtra}
                    </>
                  )}
                </p>
              </Field>
              <Field label="Creada el">
                <p className="text-[11px] text-slate-500">{dateStr}</p>
              </Field>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/80 px-3 py-2">
        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">
          Cambiar etapa
          <select
            value={proposal.status}
            onChange={(e) => onStatusChange(proposal.id, e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-2 text-xs font-medium text-header shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {PROPOSAL_STATUS_ORDER.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => onCopyLink(proposal.id)}
          className="mt-2 w-full rounded-md border border-slate-200 bg-white py-2 text-xs font-semibold text-brand transition hover:bg-brand/5"
        >
          Copiar enlace público
        </button>
      </div>
    </div>
  )
}

export default function PanelPropuestas() {
  const {
    clients,
    products,
    proposals,
    addProposal,
    updateProposalStatus,
    getClient,
  } = usePanelData()

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [clientId, setClientId] = useState('')
  const [initialStatus, setInitialStatus] = useState('borrador')
  const [quantities, setQuantities] = useState({})
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [search, setSearch] = useState('')
  const [searchScope, setSearchScope] = useState(SCOPE_ALL)

  const scopeMeta = searchScopes.find((s) => s.id === searchScope) ?? searchScopes[0]

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => proposalMatchesSearch(p, search, searchScope, getClient))
  }, [proposals, search, searchScope, getClient])

  const byColumn = useMemo(() => {
    const map = {}
    PROPOSAL_STATUS_ORDER.forEach((s) => {
      map[s.id] = filteredProposals.filter((p) => p.status === s.id)
    })
    return map
  }, [filteredProposals])

  function resetProposalForm() {
    setTitle('')
    setClientId(clients[0]?.id ?? '')
    setInitialStatus('borrador')
    setQuantities({})
    setSelectedIds(new Set())
  }

  function toggleProduct(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        next.add(id)
        setQuantities((q) => ({ ...q, [id]: q[id] ?? 1 }))
      }
      return next
    })
  }

  function setQty(id, n) {
    const v = Math.max(1, Number(n) || 1)
    setQuantities((q) => ({ ...q, [id]: v }))
  }

  function handleCreateProposal(e) {
    e.preventDefault()
    if (!clientId) return
    const productItems = products
      .filter((p) => selectedIds.has(p.id))
      .map((p) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: quantities[p.id] ?? 1,
        template: normalizeProductTemplate(p.template),
      }))
    if (productItems.length === 0) return
    const items = wrapProposalItemsWithDefaults(productItems)
    addProposal({
      clientId,
      title: title || 'Propuesta',
      status: initialStatus,
      items,
    })
    setOpen(false)
    resetProposalForm()
  }

  function copyLink(id) {
    void navigator.clipboard.writeText(publicProposalUrl(id))
  }

  function clearSearch() {
    setSearch('')
    setSearchScope(SCOPE_ALL)
  }

  return (
    <div className="min-h-0">
      <div className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-header sm:text-3xl">Propuestas</h1>
          <p className="mt-1 text-sm text-slate-600">
            Tablero por etapas; cada tarjeta resume cliente, empresa e importe
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetProposalForm()
            setClientId(clients[0]?.id ?? '')
            setOpen(true)
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-gold/50 bg-gold px-5 py-2.5 text-sm font-bold text-header shadow-sm transition hover:bg-gold/90 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
          disabled={clients.length === 0 || products.length === 0}
        >
          Nueva propuesta
        </button>
      </div>

      {(clients.length === 0 || products.length === 0) && (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Cree al menos un <strong>cliente</strong> y un <strong>producto</strong> para generar propuestas.
        </p>
      )}

      {proposals.length > 0 && (
        <div className="mt-6 space-y-4 rounded-md border border-slate-200 bg-[#f5f6f8] p-4 shadow-sm sm:p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-header">¿Dónde buscar?</p>
            <p className="mt-0.5 text-xs text-slate-500">Filtre las tarjetas en todas las columnas a la vez.</p>
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
          <div>
            <label htmlFor="proposal-search" className="sr-only">
              Buscar propuestas
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="proposal-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={scopeMeta.placeholder}
                className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-header shadow-sm placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
                autoComplete="off"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">{scopeMeta.hint}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-3">
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-brand">{filteredProposals.length}</span> de {proposals.length} propuesta
              {proposals.length !== 1 ? 's' : ''} visibles
            </p>
            {(search.trim() || searchScope !== SCOPE_ALL) && (
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-slate-50"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        </div>
      )}

      {proposals.length > 0 && filteredProposals.length === 0 && (
        <div className="mt-4 rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-600 shadow-sm">
          Ninguna propuesta coincide con la búsqueda.{' '}
          <button type="button" onClick={clearSearch} className="font-semibold text-brand underline-offset-2 hover:underline">
            Ver todas
          </button>
        </div>
      )}

      <div className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:gap-3">
        {PROPOSAL_STATUS_ORDER.map((col) => (
          <div key={col.id} className="w-[min(100%,280px)] shrink-0 lg:w-auto lg:min-w-0">
            <h2 className="mb-2 flex items-baseline gap-1.5 text-xs font-bold uppercase tracking-wide text-header">
              {col.label}
              <span className="rounded-md bg-slate-200/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                {byColumn[col.id].length}
              </span>
            </h2>
            <div className="flex min-h-[140px] flex-col gap-2.5 rounded-md border border-slate-200 bg-[#f5f6f8] p-2">
              {byColumn[col.id].length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-300 bg-white/60 px-2 py-6 text-center text-[11px] text-slate-500">
                  Ninguna en esta etapa
                </p>
              ) : (
                byColumn[col.id].map((p) => (
                  <ProposalCard
                    key={p.id}
                    proposal={p}
                    getClient={getClient}
                    onStatusChange={updateProposalStatus}
                    onCopyLink={copyLink}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} title="Nueva propuesta" onClose={() => setOpen(false)} wide>
        <form onSubmit={handleCreateProposal} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="pr-title">
                Nombre de la propuesta
              </label>
              <input
                id="pr-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Renovación CCTV sede 2025"
                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="pr-client">
                Cliente (contacto)
              </label>
              <select
                id="pr-client"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.company?.trim() ? ` — ${c.company.trim()}` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="pr-status">
                Etapa inicial
              </label>
              <select
                id="pr-status"
                value={initialStatus}
                onChange={(e) => setInitialStatus(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                {PROPOSAL_STATUS_ORDER.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-header">Líneas de producto</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Marque productos y ajuste cantidades. Se añadirán por defecto encabezado, bienvenida antes de los ítems y
              despedida al final en la propuesta pública.
            </p>
            <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto rounded-md border border-slate-100 p-2">
              {products.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-2 rounded-md bg-slate-50 px-2 py-2">
                  <label className="flex flex-1 cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleProduct(p.id)}
                    />
                    <span className="min-w-0 flex-1">
                      {p.sku?.trim() && (
                        <span className="block font-mono text-[10px] font-semibold text-brand">{p.sku.trim()}</span>
                      )}
                      <span className="font-medium text-header">{p.name}</span>
                    </span>
                    <span className="shrink-0 text-slate-500">{formatCop(p.price)}</span>
                  </label>
                  {selectedIds.has(p.id) && (
                    <input
                      type="number"
                      min={1}
                      value={quantities[p.id] ?? 1}
                      onChange={(e) => setQty(p.id, e.target.value)}
                      className="w-16 rounded-md border border-slate-200 px-2 py-1 text-sm"
                      aria-label={`Cantidad ${p.name}`}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-header px-4 py-2 text-sm font-semibold text-gold transition hover:bg-header/90"
            >
              Crear propuesta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
