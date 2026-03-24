import { Link } from 'react-router-dom'

/**
 * CTA del header hacia el formulario de contacto. No usa WhatsApp: el acceso directo a wa.me queda en los botones flotantes.
 */
export default function NavbarContactCta({
  variant = 'toolbar',
  className = '',
  onNavigate,
  onClick,
  ...rest
}) {
  function handleClick(e) {
    onClick?.(e)
    onNavigate?.()
  }

  const styles = {
    /** Barra superior: mismo núcleo que `.btn-gold` en index.css */
    topbar: 'btn-gold btn-gold--nav',
    topbarSm: 'btn-gold btn-gold--nav-sm',
    menu:
      'inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-brand py-3.5 text-sm font-semibold text-white shadow-sm transition-[transform,background-color,border-color] hover:scale-[1.01] hover:border-white/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
  }

  return (
    <Link
      to="/#contacto"
      className={`${styles[variant] ?? styles.topbar} ${className}`}
      aria-label="Ir al formulario de contacto"
      onClick={handleClick}
      {...rest}
    >
      <svg className="h-4 w-4 shrink-0 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      Cotización
    </Link>
  )
}
