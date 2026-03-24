import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { COTIZAR_QUERY } from '../data/cotizarDesdeHero.js'
import Hero from '../components/Hero.jsx'
import CtaInline from '../components/CtaInline.jsx'
import InsightsNoticias from '../components/InsightsNoticias.jsx'
import Servicios from '../components/Servicios.jsx'
import SectoresIndustrias from '../components/SectoresIndustrias.jsx'
import MarcasAliadas from '../components/MarcasAliadas.jsx'
import ContactoCTA from '../components/ContactoCTA.jsx'

export default function HomePage() {
  const { hash, search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const wantsContact = Boolean(hash?.replace('#', '') === 'contacto' || params.has(COTIZAR_QUERY))
    const id = hash ? hash.replace('#', '') : wantsContact ? 'contacto' : ''

    if (!id) return
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [hash, search])

  return (
    <>
      <Hero />
      <CtaInline />
      <InsightsNoticias />
      <Servicios />
      <SectoresIndustrias />
      <MarcasAliadas />
      <ContactoCTA />
    </>
  )
}
