import { useEffect, useState } from 'react'

/**
 * Marca qué sección con `id` está activa según el scroll (útil para resaltar el menú).
 * @param {string[]} sectionIds - ej. ['inicio','nosotros',...]
 * @param {number} offset - píxeles desde arriba (altura aprox. del header)
 */
export function useScrollSpy(sectionIds, offset = 112) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return

    const onScroll = () => {
      const y = window.scrollY + offset
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= y) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, offset])

  return activeId
}
