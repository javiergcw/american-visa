export const PROPOSAL_STATUS_ORDER = [
  { id: 'borrador', label: 'Borrador' },
  { id: 'enviada', label: 'Enviada' },
  { id: 'vista', label: 'Vista' },
  { id: 'negociando', label: 'Negociando' },
  { id: 'cerrada', label: 'Cerrada' },
  { id: 'perdida', label: 'Perdida' },
]

export const STORAGE_KEY = 'american-visa-panel-v1'

export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}
