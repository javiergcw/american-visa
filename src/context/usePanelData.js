import { useContext } from 'react'
import { PanelDataContext } from './panelContext.js'

export function usePanelData() {
  const ctx = useContext(PanelDataContext)
  if (!ctx) {
    throw new Error('usePanelData debe usarse dentro de PanelDataProvider')
  }
  return ctx
}
