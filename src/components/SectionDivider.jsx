/**
 * Separador entre bloques: líneas que se desvanecen hacia los bordes y acento central de marca.
 */
export default function SectionDivider({ className = '' }) {
  return (
    <div
      className={`relative w-full bg-white ${className}`}
      role="presentation"
      aria-hidden
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div
          className="h-px min-w-0 flex-1 bg-linear-to-r from-transparent via-slate-300/90 to-slate-200/60"
          aria-hidden
        />
        <div className="flex shrink-0 items-center gap-2" aria-hidden>
          <span className="h-px w-4 bg-linear-to-r from-transparent to-brand/50 sm:w-5" />
          <span className="size-1.5 rotate-45 bg-brand shadow-[0_0_0_1px_rgba(59,102,173,0.2)] sm:size-2" />
          <span className="h-px w-4 bg-linear-to-l from-transparent to-brand/50 sm:w-5" />
        </div>
        <div
          className="h-px min-w-0 flex-1 bg-linear-to-l from-transparent via-slate-300/90 to-slate-200/60"
          aria-hidden
        />
      </div>
    </div>
  )
}
