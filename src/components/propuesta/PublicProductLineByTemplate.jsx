import { formatCop } from '../../utils/money.js'
import { normalizeProductTemplate } from '../../data/productTemplates.js'

function MediaPlaceholder({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-linear-to-br from-slate-200 via-slate-100 to-slate-200 text-slate-400 ring-1 ring-inset ring-slate-200/80 ${className}`}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
        <svg className="h-10 w-10 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-wider">Imagen del producto</span>
      </div>
    </div>
  )
}

function SinIvaHint() {
  return (
    <span className="block text-[10px] font-medium uppercase tracking-wide text-slate-400">Sin IVA</span>
  )
}

function PriceBlock({ line }) {
  const subtotal = (Number(line.price) || 0) * (Number(line.quantity) || 0)
  return (
    <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-slate-100 pt-3 sm:mt-4 sm:pt-4">
      <p className="text-sm text-slate-500">
        {formatCop(line.price)} <span className="text-slate-400">×</span> {line.quantity}
      </p>
      <div className="text-right">
        <p className="text-lg font-bold text-brand">{formatCop(subtotal)}</p>
        <SinIvaHint />
      </div>
    </div>
  )
}

function TextBlock({ line, description, titleClass = 'text-lg font-bold text-header' }) {
  return (
    <div className="min-w-0 flex-1">
      <h3 className={`leading-snug ${titleClass}`}>{line.name}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-4">{description}</p>
      ) : null}
    </div>
  )
}

/** Vista pública de una línea de producto según la plantilla elegida en el catálogo. */
export default function PublicProductLineByTemplate({ line, description = '', template }) {
  const id = normalizeProductTemplate(template)

  if (id === 'texto-media-2') {
    return (
      <div className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
          <TextBlock line={line} description={description} />
          <div className="w-full shrink-0 sm:w-[42%]">
            <MediaPlaceholder className="h-full min-h-[140px] w-full sm:min-h-[180px]" />
          </div>
        </div>
        <PriceBlock line={line} />
      </div>
    )
  }

  if (id === 'banner-media-3') {
    return (
      <div className="overflow-hidden">
        <MediaPlaceholder className="min-h-[140px] w-full rounded-none sm:min-h-[180px]" />
        <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-header">{line.name}</h3>
              {description ? (
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-3">{description}</p>
              ) : null}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Subtotal</p>
              <p className="text-xl font-bold text-brand">{formatCop((Number(line.price) || 0) * (Number(line.quantity) || 0))}</p>
              <SinIvaHint />
              <p className="mt-1 text-xs text-slate-500">
                {formatCop(line.price)} × {line.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'banner-text-media-4') {
    const subtotal = (Number(line.price) || 0) * (Number(line.quantity) || 0)
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-linear-to-br from-slate-300 via-slate-200 to-slate-400" aria-hidden />
          <div className="absolute inset-0 bg-linear-to-t from-header/90 via-header/75 to-header/55" aria-hidden />
        </div>
        <div className="relative px-5 py-6 text-white sm:px-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/90">Producto</p>
              <h3 className="mt-1 text-xl font-bold leading-tight sm:text-2xl">{line.name}</h3>
              {description ? (
                <p className="mt-2 text-sm leading-relaxed text-white/85 line-clamp-3">{description}</p>
              ) : null}
            </div>
            <div className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/70">Subtotal</p>
              <p className="text-2xl font-bold text-gold">{formatCop(subtotal)}</p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-white/50">Sin IVA</p>
              <p className="mt-1 text-xs text-white/75">
                {formatCop(line.price)} × {line.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* media-texto-1 (default) */
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
        <div className="w-full shrink-0 sm:w-[42%]">
          <MediaPlaceholder className="h-full min-h-[140px] w-full sm:min-h-[180px]" />
        </div>
        <TextBlock line={line} description={description} />
      </div>
      <PriceBlock line={line} />
    </div>
  )
}
