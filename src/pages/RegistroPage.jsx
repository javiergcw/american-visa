import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RegistroPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-muted pb-24 pt-40 sm:pt-44">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6 lg:px-8">
        <h1 className="section-heading-h2 text-header">Crear cuenta</h1>
        <p className="section-lead mt-3 text-slate-600">
          El registro en línea estará disponible próximamente. Mientras tanto, puede contactarnos desde el inicio.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/login" className="text-sm font-semibold text-brand hover:underline">
            Volver a iniciar sesión
          </Link>
          <Link to="/" className="btn-gold btn-gold--default inline-flex">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
