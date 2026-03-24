import { useMemo, useState } from 'react'
import { usePanelData } from '../../context/usePanelData.js'
import Modal from '../../components/panel/Modal.jsx'
import { formatCop } from '../../utils/money.js'
import { getAvatarColors, getProductCardInitials } from '../../utils/productCardAvatar.js'
import {
  DEFAULT_PRODUCT_TEMPLATE,
  PRODUCT_TEMPLATE_IDS,
  normalizeProductTemplate,
} from '../../data/productTemplates.js'

const SCOPE_ALL = 'all'
const SCOPE_NAME = 'name'
const SCOPE_DESC = 'description'
const SCOPE_SKU = 'sku'
const SCOPE_PRICE = 'price'

const searchScopes = [
  {
    id: SCOPE_ALL,
    label: 'Todo',
    hint: 'Busca en nombre, SKU, descripción y precio.',
    placeholder: 'Nombre, SKU, descripción o precio…',
  },
  {
    id: SCOPE_NAME,
    label: 'Nombre',
    hint: 'Solo en el nombre del producto.',
    placeholder: 'Ej. CCTV, NVR, cableado…',
  },
  {
    id: SCOPE_DESC,
    label: 'Descripción',
    hint: 'Solo en el texto descriptivo.',
    placeholder: 'Palabras de la descripción…',
  },
  {
    id: SCOPE_SKU,
    label: 'SKU',
    hint: 'Código de referencia; mayúsculas o minúsculas da igual.',
    placeholder: 'Ej. AV-CCTV, NVR…',
  },
  {
    id: SCOPE_PRICE,
    label: 'Precio',
    hint: 'Escriba números del precio en COP (sin puntos o con ellos).',
    placeholder: 'Ej. 4200000, 280…',
  },
]

const REFINE_ALL = 'all'
const REFINE_WITH_SKU = 'with_sku'
const REFINE_NO_SKU = 'no_sku'

const refineOptions = [
  { id: REFINE_ALL, label: 'Todos los productos' },
  { id: REFINE_WITH_SKU, label: 'Solo los que tienen SKU' },
  { id: REFINE_NO_SKU, label: 'Solo los que no tienen SKU' },
]

function normalizeDigits(s) {
  return String(s || '').replace(/\D/g, '')
}

function productSku(p) {
  return String(p.sku ?? '').trim()
}

function matchesSearch(p, q, scope) {
  if (!q.trim()) return true
  const raw = q.trim()
  const lower = raw.toLowerCase()
  const qDigits = normalizeDigits(raw)

  if (scope === SCOPE_PRICE) {
    const priceStr = String(Number(p.price) || 0)
    if (qDigits.length > 0) return priceStr.includes(qDigits)
    return priceStr.includes(lower)
  }

  const fields = {
    [SCOPE_ALL]: [p.name, p.description, productSku(p), String(p.price), normalizeProductTemplate(p.template)],
    [SCOPE_NAME]: [p.name],
    [SCOPE_DESC]: [p.description],
    [SCOPE_SKU]: [productSku(p)],
  }[scope] || [p.name, p.description, productSku(p), String(p.price), normalizeProductTemplate(p.template)]

  return fields.filter(Boolean).some((f) => String(f).toLowerCase().includes(lower))
}

function matchesRefine(p, refineId) {
  const hasSku = Boolean(productSku(p))
  if (refineId === REFINE_WITH_SKU) return hasSku
  if (refineId === REFINE_NO_SKU) return !hasSku
  return true
}

export default function PanelProductos() {
  const { products, addProduct, updateProduct } = usePanelData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [template, setTemplate] = useState(DEFAULT_PRODUCT_TEMPLATE)
  const [search, setSearch] = useState('')
  const [searchScope, setSearchScope] = useState(SCOPE_ALL)
  const [refine, setRefine] = useState(REFINE_ALL)

  const scopeMeta = searchScopes.find((s) => s.id === searchScope) ?? searchScopes[0]

  function resetForm() {
    setSku('')
    setName('')
    setDescription('')
    setPrice('')
    setTemplate(DEFAULT_PRODUCT_TEMPLATE)
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

  function openEditModal(p) {
    setEditingId(p.id)
    setSku(productSku(p))
    setName(p.name)
    setDescription(p.description ?? '')
    setPrice(String(Number(p.price) || 0))
    setTemplate(normalizeProductTemplate(p.template))
    setOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    if (editingId) {
      updateProduct(editingId, { sku, name, description, price, template })
    } else {
      addProduct({ sku, name, description, price, template })
    }
    closeModal()
  }

  function clearAllFilters() {
    setSearch('')
    setSearchScope(SCOPE_ALL)
    setRefine(REFINE_ALL)
  }

  const filtered = useMemo(() => {
    return products.filter((p) => matchesSearch(p, search, searchScope) && matchesRefine(p, refine))
  }, [products, search, searchScope, refine])

  return (
    <div className="min-h-0">
      <div className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-header sm:text-3xl">Productos</h1>
          <p className="mt-1 text-sm text-slate-600">Catálogo con SKU para armar propuestas</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-gold/50 bg-gold px-5 py-2.5 text-sm font-bold text-header shadow-sm transition hover:bg-gold/90 hover:shadow"
        >
          Crear producto
        </button>
      </div>

      <div className="mt-6 space-y-4 rounded-md border border-slate-200 bg-[#f5f6f8] p-4 shadow-sm sm:p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-header">¿Dónde buscar?</p>
          <p className="mt-0.5 text-xs text-slate-500">Elija el campo para acotar la búsqueda.</p>
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
          <label htmlFor="product-search" className="sr-only">
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
              id="product-search"
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

        <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="product-refine" className="shrink-0 text-xs font-bold uppercase tracking-wide text-header">
            Mostrar solo
          </label>
          <select
            id="product-refine"
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
            <span className="font-semibold text-brand">{filtered.length}</span> de {products.length} producto
            {products.length !== 1 ? 's' : ''}
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

      {products.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">No hay productos</p>
          <p className="mt-1 text-xs text-slate-500">Pulse “Crear producto” para añadir SKU, nombre y precio.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-md border border-slate-200 bg-white py-14 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">Ningún producto coincide con lo que eligió</p>
          <p className="mt-1 text-xs text-slate-500">Pruebe otro campo en “¿Dónde buscar?” o cambie “Mostrar solo”.</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-4 text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Limpiar todo y ver el catálogo completo
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const skuStr = productSku(p)
            const initials = getProductCardInitials(skuStr, p.name)
            const colors = getAvatarColors(skuStr || p.name || p.id)
            const templateId = normalizeProductTemplate(p.template)
            return (
              <li key={p.id}>
                <article className="flex aspect-square flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:border-brand/35 hover:shadow-md">
                  <div className="flex flex-1 flex-col items-center justify-center border-b border-slate-100 bg-linear-to-b from-slate-50 to-white px-4 py-5">
                    <div
                      className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full text-lg font-bold shadow-md ring-2 ring-white"
                      style={{ backgroundColor: colors.bg, color: colors.fg }}
                      aria-hidden
                    >
                      {initials}
                    </div>
                    {skuStr ? (
                      <p className="mt-3 line-clamp-2 text-center font-mono text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {skuStr}
                      </p>
                    ) : (
                      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Sin SKU
                      </p>
                    )}
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col justify-center gap-1 px-4 py-3 text-center">
                    <h2 className="line-clamp-2 text-sm font-bold leading-snug text-header">{p.name}</h2>
                    <p className="font-mono text-[10px] font-medium text-slate-500">{templateId}</p>
                    <p className="text-base font-bold text-brand">{formatCop(p.price)}</p>
                    {p.description?.trim() && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">{p.description.trim()}</p>
                    )}
                  </div>
                  <div className="shrink-0 border-t border-slate-100 px-3 pb-3 pt-0">
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
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

      <Modal open={open} title={editingId ? 'Editar producto' : 'Nuevo producto'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="p-sku">
              SKU <span className="font-normal text-slate-500">(código de referencia)</span>
            </label>
            <input
              id="p-sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Ej. AV-CCTV-4K"
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="p-name">
              Nombre
            </label>
            <input
              id="p-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="p-desc">
              Descripción
            </label>
            <textarea
              id="p-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="p-price">
              Precio (COP)
            </label>
            <input
              id="p-price"
              type="number"
              min={0}
              step={1}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-header" htmlFor="p-template">
              Template
            </label>
            <select
              id="p-template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-header shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {PRODUCT_TEMPLATE_IDS.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Define cómo se verá este producto en la propuesta pública (enlace compartido).
            </p>
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
