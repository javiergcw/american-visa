import { useEffect } from 'react'

export default function Modal({ open, title, children, onClose, wide }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-200 flex items-end justify-center bg-black/45 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'panel-modal-title' : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl ${
          wide ? 'max-w-2xl' : 'max-w-md'
        }`}
      >
        {title && (
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 id="panel-modal-title" className="text-lg font-bold text-header">
              {title}
            </h2>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
