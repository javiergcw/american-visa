import { Link } from 'react-router-dom'
import { LOGO_SRC } from '../../brand.js'

const FONT_MIN = 80
const FONT_MAX = 130

const btnClass =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-3 text-sm font-medium text-white shadow-sm transition hover:bg-white/[0.14] active:bg-white/[0.18] disabled:pointer-events-none disabled:opacity-35'

const iconClass = 'h-4 w-4 shrink-0 opacity-90'

const iconOnlyBtn = `${btnClass} w-10 min-w-10 gap-0 px-0`

export default function PublicProposalToolbar({
  proposalTitle,
  fontPercent,
  onFontIncrease,
  onFontDecrease,
  detailView,
  onToggleDetailView,
  onPrint,
  onCopyLink,
  copyDone,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-header/95 shadow-lg shadow-black/25 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <Link to="/" className="shrink-0 rounded-md p-0.5 ring-offset-2 ring-offset-header transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-gold/70" title="Ir al inicio">
            <img src={LOGO_SRC} alt="American Visa Technology" className="h-9 w-auto object-contain object-left sm:h-10" width={140} height={40} />
          </Link>
          <div className="min-w-0 border-l border-white/15 pl-3 sm:pl-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[11px]">Propuesta comercial</p>
            <p className="truncate text-sm font-semibold leading-snug text-white sm:text-base">{proposalTitle}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:justify-end" aria-label="Acciones de la propuesta">
          {/* Tamaño de texto: A− / A+ */}
          <div
            className="flex items-center gap-0.5 rounded-lg border border-white/20 bg-black/20 p-0.5"
            role="group"
            aria-label="Tamaño del texto"
          >
            <button
              type="button"
              aria-label="Reducir tamaño del texto"
              title="Reducir tamaño del texto"
              disabled={fontPercent <= FONT_MIN}
              onClick={onFontDecrease}
              className={`${btnClass} min-w-11 border-0 bg-transparent px-3 font-bold shadow-none hover:bg-white/10 sm:min-w-12`}
            >
              <span className="text-base leading-none tracking-tight">A−</span>
            </button>
            <span className="select-none px-1 text-center text-[10px] font-semibold tabular-nums text-white/45 sm:min-w-9 sm:text-[11px]" title="Escala actual">
              {fontPercent}%
            </span>
            <button
              type="button"
              aria-label="Aumentar tamaño del texto"
              title="Aumentar tamaño del texto"
              disabled={fontPercent >= FONT_MAX}
              onClick={onFontIncrease}
              className={`${btnClass} min-w-11 border-0 bg-transparent px-3 font-bold shadow-none hover:bg-white/10 sm:min-w-12`}
            >
              <span className="text-base leading-none tracking-tight">A+</span>
            </button>
          </div>

          <button
            type="button"
            title={detailView ? 'Ocultar fichas de productos' : 'Mostrar fichas de productos'}
            onClick={onToggleDetailView}
            className={btnClass}
          >
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {detailView ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
            <span>{detailView ? 'Encoger' : 'Ampliar'}</span>
          </button>

          <button
            type="button"
            aria-label="Imprimir o guardar como PDF"
            title="Imprimir o guardar como PDF"
            onClick={onPrint}
            className={iconOnlyBtn}
          >
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label={copyDone ? 'Enlace copiado' : 'Copiar enlace de la propuesta'}
            title={copyDone ? 'Enlace copiado' : 'Copiar enlace'}
            onClick={onCopyLink}
            className={iconOnlyBtn}
          >
            {copyDone ? (
              <svg className={`${iconClass} text-gold`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>

          <Link
            to="/"
            aria-label="Ir al sitio web"
            title="Sitio web American Visa"
            className={`${iconOnlyBtn} border-gold/35 bg-gold/10 text-gold hover:bg-gold/20 hover:text-gold`}
          >
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export { FONT_MIN, FONT_MAX }
