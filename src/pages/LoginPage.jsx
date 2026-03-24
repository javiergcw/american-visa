import { useEffect, useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CONTACT_SIDE_IMAGE } from '../brand.js'

function IconEye(props) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  )
}

function IconEyeSlash(props) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition placeholder:text-slate-400 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/25'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const passwordId = useId()
  const emailId = useId()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    navigate('/panel', { replace: true })
  }

  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col bg-surface pt-20 sm:pt-24 lg:min-h-[calc(100svh-6.5rem)] lg:flex-row lg:pt-24">
      <div className="relative h-40 w-full shrink-0 sm:h-48 lg:h-auto lg:min-h-[calc(100svh-6.5rem)] lg:w-1/2 lg:self-stretch">
        <img
          src={CONTACT_SIDE_IMAGE}
          alt=""
          className="h-full w-full object-cover lg:absolute lg:inset-0"
          decoding="async"
        />
        <div className="absolute inset-0 bg-header/35" aria-hidden />
      </div>

      <div className="flex w-full flex-1 items-center justify-center bg-surface px-4 py-10 sm:px-6 lg:w-1/2 lg:py-16">
        <div className="w-full max-w-[420px]">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-header"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="section-heading-h2">Bienvenido</h1>
          <p className="section-lead-tight mt-2 text-slate-600">Ingresa tus credenciales para continuar</p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor={passwordId} className="mb-1.5 block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id={passwordId}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="········"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-slate-500 transition-colors hover:text-brand"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <IconEyeSlash className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-brand transition-colors hover:text-brand/80 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            <button type="submit" className="btn-gold btn-gold--default w-full justify-center py-3 text-base">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
