import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LOGO_SRC, WA_BASE } from '../brand.js'
import { usePanelData } from '../context/usePanelData.js'
import { computeIvaBreakdown, formatCop } from '../utils/money.js'
import { partitionPublicProposalSections } from '../utils/proposalLines.js'
import PublicProductLineByTemplate from '../components/propuesta/PublicProductLineByTemplate.jsx'
import PublicProposalWhatsAppFloat from '../components/propuesta/PublicProposalWhatsAppFloat.jsx'
import PublicProposalToolbar, { FONT_MAX, FONT_MIN } from '../components/propuesta/PublicProposalToolbar.jsx'

const HERO_IMAGE = '/security.jpg'
const FONT_STEP = 10

export default function PublicPropuestaPage() {
  const { id } = useParams()
  const { getProposal, getClient, getProduct } = usePanelData()

  const [fontPercent, setFontPercent] = useState(100)
  const [detailView, setDetailView] = useState(true)
  const [copyDone, setCopyDone] = useState(false)

  const proposal = useMemo(() => (id ? getProposal(id) : null), [id, getProposal])
  const client = proposal ? getClient(proposal.clientId) : null

  const sections = useMemo(() => {
    if (!proposal) return null
    return partitionPublicProposalSections(proposal.items)
  }, [proposal])

  const waMessage = useMemo(() => {
    if (!proposal) return 'Hola, tengo una consulta sobre una propuesta de American Visa Technology.'
    return `Hola, escribo respecto a la propuesta «${proposal.title}».`
  }, [proposal])

  const advisorWhatsAppHref = useMemo(() => {
    if (!proposal) return WA_BASE
    const text = `Hola, quisiera comunicarme con un asesor sobre la propuesta «${proposal.title}».`
    return `${WA_BASE}?text=${encodeURIComponent(text)}`
  }, [proposal])

  const tax = useMemo(() => computeIvaBreakdown(proposal?.total ?? 0), [proposal?.total])

  const increaseFont = useCallback(() => {
    setFontPercent((p) => Math.min(FONT_MAX, p + FONT_STEP))
  }, [])

  const decreaseFont = useCallback(() => {
    setFontPercent((p) => Math.max(FONT_MIN, p - FONT_STEP))
  }, [])

  const toggleDetailView = useCallback(() => {
    setDetailView((v) => !v)
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleCopyLink = useCallback(() => {
    const url = window.location.href
    void navigator.clipboard.writeText(url).then(() => {
      setCopyDone(true)
      window.setTimeout(() => setCopyDone(false), 2200)
    })
  }, [])

  if (!proposal || !sections) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-header px-4 text-center text-white">
        <p className="text-lg font-semibold text-gold">Propuesta no encontrada</p>
        <p className="mt-2 text-sm text-white/75">El enlace puede ser incorrecto o la propuesta ya no está disponible.</p>
      </div>
    )
  }

  const atnLine = client?.company?.trim() || client?.name || 'Cliente'
  const greetingName = client?.name?.trim() || 'Cliente'

  return (
    <div className="public-proposal-page min-h-screen bg-header pb-6 text-ink sm:pb-10">
      <PublicProposalToolbar
        proposalTitle={proposal.title}
        fontPercent={fontPercent}
        onFontIncrease={increaseFont}
        onFontDecrease={decreaseFont}
        detailView={detailView}
        onToggleDetailView={toggleDetailView}
        onPrint={handlePrint}
        onCopyLink={handleCopyLink}
        copyDone={copyDone}
      />

      <div className="mx-auto max-w-4xl px-0 sm:px-4">
        <div
          className="proposal-document-shell overflow-hidden bg-white shadow-2xl shadow-black/40"
          style={{ zoom: fontPercent / 100 }}
        >
          {/* Hero: imagen + bloque azul marino American Visa */}
          <section className="overflow-hidden">
            <div className="relative h-52 sm:h-72">
              <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
              <div
                className="absolute inset-0 bg-linear-to-t from-header via-header/55 to-brand/35"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5">
                <img src={LOGO_SRC} alt="American Visa Technology" className="h-11 w-auto object-contain drop-shadow-lg sm:h-12" />
              </div>
            </div>
            <div className="border-t-2 border-gold/80 bg-header px-6 py-8 text-white sm:px-10 sm:py-10">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">{proposal.title}</h1>
              <p className="mt-3 text-base font-medium text-gold/95 sm:text-lg">Atn. {atnLine}</p>
            </div>
          </section>

          {/* Carta de bienvenida */}
          <section className="px-6 py-10 sm:px-12 sm:py-12">
            <p className="text-right text-sm font-medium text-slate-600">Atn. {atnLine}</p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-header sm:text-3xl">{proposal.title}</h2>
            <p className="mt-1 text-sm text-slate-600">Propuesta comercial</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{sections.headerText}</p>
            <div className="mt-3 h-1 w-14 rounded-sm bg-gold" aria-hidden />
            <p className="mt-8 text-base font-medium text-header">Hola {greetingName},</p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
              {sections.welcomeText.split(/\n+/).map((para, i) =>
                para.trim() ? (
                  <p key={i} className="whitespace-pre-wrap">
                    {para.trim()}
                  </p>
                ) : null,
              )}
            </div>
          </section>

          {/* Detalle visual por plantilla */}
          {detailView && sections.productLines.length > 0 && (
            <section className="border-t border-slate-200">
              <div className="border-b border-header/15 bg-header px-6 py-4 sm:px-10">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gold">Productos y servicios</h2>
                <p className="mt-1 text-xs text-white/70">Vista según la plantilla definida para cada ítem.</p>
              </div>
              <ul className="divide-y divide-slate-200">
                {sections.productLines.map((line, i) => {
                  const product = line.productId ? getProduct(line.productId) : null
                  const description = product?.description?.trim() ?? ''
                  const template = line.template ?? product?.template
                  return (
                    <li key={`${line.productId}-${i}`} className="overflow-hidden">
                      <PublicProductLineByTemplate line={line} description={description} template={template} />
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {!detailView && sections.productLines.length > 0 && (
            <section className="border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-10">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-header">Vista resumida:</span> las fichas visuales están ocultas. El
                detalle económico sigue abajo.
              </p>
            </section>
          )}

          {/* Costo de la inversión */}
          <section className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-white">
            <div className="px-6 py-10 sm:px-12 sm:py-12">
              <header className="max-w-3xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand sm:text-[11px]">
                  Resumen económico
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-header sm:text-3xl">Costo de la inversión</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Precios unitarios y totales por línea en <strong className="font-semibold text-header">pesos colombianos sin IVA</strong>.
                  El desglose inferior incorpora <strong className="font-semibold text-header">IVA {tax.ratePercent}%</strong> conforme a la normativa vigente en Colombia.
                </p>
              </header>

              {sections.productLines.length > 0 ? (
                <div className="mt-10 overflow-hidden border border-slate-200 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead>
                        <tr className="bg-header text-white">
                          <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider sm:px-6">Concepto</th>
                          <th className="px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider">Cant.</th>
                          <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider">
                            Precio / u <span className="font-normal text-white/70">(sin IVA)</span>
                          </th>
                          <th className="px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider sm:px-6">
                            Total línea <span className="font-normal text-white/70">(sin IVA)</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sections.productLines.map((line, i) => {
                          const qty = Number(line.quantity) || 0
                          const price = Number(line.price) || 0
                          const rowTotal = price * qty
                          return (
                            <tr
                              key={`${line.productId}-${i}`}
                              className="transition-colors hover:bg-slate-50/80"
                            >
                              <td className="px-5 py-4 font-semibold text-header sm:px-6">{line.name}</td>
                              <td className="px-4 py-4 text-center tabular-nums text-slate-700">{qty}</td>
                              <td className="px-4 py-4 text-right tabular-nums text-slate-600">{formatCop(price)}</td>
                              <td className="px-5 py-4 text-right text-sm font-bold text-brand tabular-nums sm:px-6">
                                {formatCop(rowTotal)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="mt-8 border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
                  No hay líneas de producto en esta propuesta.
                </p>
              )}

              <div className="mx-auto mt-10 max-w-md sm:ml-auto sm:mr-0">
                <div className="border border-slate-200 bg-white p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Liquidación</p>
                  <dl className="mt-4 space-y-3.5">
                    <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3">
                      <dt className="text-sm text-slate-600">Subtotal</dt>
                      <dd className="text-right">
                        <span className="text-sm font-semibold tabular-nums text-header">{formatCop(tax.subtotal)}</span>
                        <span className="mt-0.5 block text-[10px] text-slate-400">Base sin IVA</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3">
                      <dt className="text-sm text-slate-600">IVA ({tax.ratePercent}%)</dt>
                      <dd className="text-right">
                        <span className="text-sm font-semibold tabular-nums text-slate-800">{formatCop(tax.iva)}</span>
                        <span className="mt-0.5 block text-[10px] text-slate-400">Impuesto al consumo</span>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 pt-1 sm:flex-row sm:items-end sm:justify-between">
                      <dt className="text-xs font-bold uppercase tracking-wide text-header">Total a pagar</dt>
                      <dd className="text-3xl font-bold leading-none text-brand tabular-nums sm:text-4xl">
                        {formatCop(tax.totalInclIva)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-right text-[11px] leading-relaxed text-slate-500">
                    COP · Total incluye IVA · Cotización referencial; condiciones comerciales definitivas con su asesor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Despedida (sin firma) */}
          <section className="border-t border-slate-200 bg-white px-6 py-10 sm:px-12">
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              {sections.farewellText.split(/\n+/).map((para, i) =>
                para.trim() ? (
                  <p key={i} className="whitespace-pre-wrap">
                    {para.trim()}
                  </p>
                ) : null,
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-header/15 bg-header/4 px-6 py-8 sm:px-12">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={advisorWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold--default inline-flex w-full items-center justify-center gap-2 px-8 py-3 text-base sm:w-auto"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Comunicarme con un asesor
              </a>
              <Link to="/" className="text-center text-sm font-semibold text-brand hover:underline">
                Ir al sitio de American Visa Technology
              </Link>
            </div>
          </section>

          {/* Pie oscuro con imagen */}
          <footer className="relative overflow-hidden border-t-4 border-gold text-white">
            <div className="absolute inset-0">
              <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-linear-to-br from-header via-header to-[#050d18]" aria-hidden />
              <div className="absolute inset-0 bg-brand/15" aria-hidden />
            </div>
            <div className="relative px-6 py-10 text-right sm:px-12">
              <img src={LOGO_SRC} alt="" className="ml-auto h-10 w-auto object-contain brightness-0 invert sm:h-11" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">American Visa Technology</p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">Bogotá, Colombia</p>
              <p className="mt-1 text-sm text-white/70">Propuesta comercial · {proposal.title}</p>
            </div>
          </footer>
        </div>
      </div>

      <PublicProposalWhatsAppFloat message={waMessage} />
    </div>
  )
}
