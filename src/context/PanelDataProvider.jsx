import { useCallback, useEffect, useMemo, useState } from 'react'
import { getInitialPanelDataset } from '../data/panelSeedData.js'
import { PanelDataContext } from './panelContext.js'
import { generateId, STORAGE_KEY } from './panelConstants.js'
import { normalizeProductTemplate } from '../data/productTemplates.js'

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getInitialPanelDataset()
    const data = JSON.parse(raw)
    return {
      clients: Array.isArray(data.clients) ? data.clients : [],
      products: Array.isArray(data.products) ? data.products : [],
      proposals: Array.isArray(data.proposals) ? data.proposals : [],
    }
  } catch {
    return getInitialPanelDataset()
  }
}

export function PanelDataProvider({ children }) {
  const [clients, setClients] = useState(() => loadStored().clients)
  const [products, setProducts] = useState(() => loadStored().products)
  const [proposals, setProposals] = useState(() => loadStored().proposals)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ clients, products, proposals }))
  }, [clients, products, proposals])

  const addClient = useCallback((payload) => {
    const c = {
      id: generateId(),
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || '',
      company: payload.company?.trim() || '',
    }
    setClients((prev) => [...prev, c])
    return c.id
  }, [])

  const updateClient = useCallback((clientId, payload) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              name: payload.name.trim(),
              email: payload.email.trim(),
              phone: payload.phone?.trim() || '',
              company: payload.company?.trim() || '',
            }
          : c,
      ),
    )
  }, [])

  const addProduct = useCallback((payload) => {
    const p = {
      id: generateId(),
      sku: String(payload.sku ?? '').trim(),
      name: payload.name.trim(),
      description: String(payload.description ?? '').trim(),
      price: Number(payload.price) || 0,
      template: normalizeProductTemplate(payload.template),
    }
    setProducts((prev) => [...prev, p])
    return p.id
  }, [])

  const updateProduct = useCallback((productId, payload) => {
    const name = payload.name.trim()
    const sku = String(payload.sku ?? '').trim()
    const description = String(payload.description ?? '').trim()
    const price = Number(payload.price) || 0
    const template = normalizeProductTemplate(payload.template)

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, sku, name, description, price, template } : p,
      ),
    )

    setProposals((prev) =>
      prev.map((pr) => {
        let touched = false
        const items = pr.items.map((line) => {
          if (line.productId !== productId) return line
          touched = true
          return { ...line, name, price, template }
        })
        if (!touched) return pr
        const total = items.reduce(
          (s, line) => s + (Number(line.price) || 0) * (Number(line.quantity) || 0),
          0,
        )
        return { ...pr, items, total }
      }),
    )
  }, [])

  const addProposal = useCallback((payload) => {
    const total = payload.items.reduce((s, line) => s + line.price * line.quantity, 0)
    const pr = {
      id: generateId(),
      clientId: payload.clientId,
      status: payload.status || 'borrador',
      items: payload.items,
      total,
      createdAt: new Date().toISOString(),
      title: payload.title?.trim() || 'Propuesta',
    }
    setProposals((prev) => [...prev, pr])
    return pr.id
  }, [])

  const updateProposalStatus = useCallback((proposalId, status) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status } : p)),
    )
  }, [])

  const acceptProposalPublic = useCallback((proposalId) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId
          ? { ...p, status: 'negociando', acceptedAt: new Date().toISOString() }
          : p,
      ),
    )
  }, [])

  const getClient = useCallback(
    (id) => clients.find((c) => c.id === id),
    [clients],
  )

  const getProposal = useCallback(
    (id) => proposals.find((p) => p.id === id),
    [proposals],
  )

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id),
    [products],
  )

  const metrics = useMemo(() => {
    const enviadas = proposals.filter((p) => p.status === 'enviada').length
    const vistas = proposals.filter((p) => p.status === 'vista').length
    const cerradas = proposals.filter((p) => p.status === 'cerrada').length
    return { enviadas, vistas, cerradas }
  }, [proposals])

  const value = useMemo(
    () => ({
      clients,
      products,
      proposals,
      addClient,
      updateClient,
      addProduct,
      updateProduct,
      addProposal,
      updateProposalStatus,
      acceptProposalPublic,
      getClient,
      getProposal,
      getProduct,
      metrics,
    }),
    [
      clients,
      products,
      proposals,
      addClient,
      updateClient,
      addProduct,
      updateProduct,
      addProposal,
      updateProposalStatus,
      acceptProposalPublic,
      getClient,
      getProposal,
      getProduct,
      metrics,
    ],
  )

  return <PanelDataContext.Provider value={value}>{children}</PanelDataContext.Provider>
}
