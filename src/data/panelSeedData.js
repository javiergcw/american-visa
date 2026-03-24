/**
 * Datos de ejemplo la primera vez (localStorage vacío).
 * Sustituye o amplía según necesidad.
 */
export function getInitialPanelDataset() {
  const clients = [
    {
      id: 'seed-c-1',
      name: 'Banco Andino S.A.',
      email: 'seguridad@bancoandino.com.co',
      phone: '+57 601 555 0100',
      company: 'Banca',
    },
    {
      id: 'seed-c-2',
      name: 'Retail Moda Express',
      email: 'operaciones@modaexpress.co',
      phone: '+57 604 555 0200',
      company: 'Retail',
    },
    {
      id: 'seed-c-3',
      name: 'Industrias Metalnor',
      email: 'planta@metalnor.com',
      phone: '+57 602 555 0300',
      company: 'Manufactura',
    },
    {
      id: 'seed-c-4',
      name: 'Conjunto Torres del Parque',
      email: 'administracion@torresdelparque.com',
      phone: '+57 601 555 0400',
      company: 'Administración de PH',
    },
  ]

  const products = [
    {
      id: 'seed-p-1',
      sku: 'AV-CCTV-4K',
      name: 'Sistema CCTV IP (4 cámaras)',
      description: 'Kit completo con NVR y visión nocturna.',
      price: 4_200_000,
      template: 'media-texto-1',
    },
    {
      id: 'seed-p-2',
      sku: 'AV-ACC-BIO',
      name: 'Control de acceso biométrico',
      description: 'Lector huella + tarjeta, software de gestión.',
      price: 3_100_000,
      template: 'texto-media-2',
    },
    {
      id: 'seed-p-3',
      sku: 'AV-CAB-PT',
      name: 'Cableado estructurado (por punto)',
      description: 'Certificación y canalización incluida.',
      price: 280_000,
      template: 'banner-media-3',
    },
    {
      id: 'seed-p-4',
      sku: 'AV-NVR-32',
      name: 'NVR 32 canales',
      description: 'Grabación continua y respaldo en nube opcional.',
      price: 5_800_000,
      template: 'banner-text-media-4',
    },
    {
      id: 'seed-p-5',
      sku: 'AV-MANT-12',
      name: 'Mantenimiento anual',
      description: 'Visitas trimestrales y soporte remoto.',
      price: 2_400_000,
      template: 'media-texto-1',
    },
  ]

  function line(pid, qty) {
    const p = products.find((x) => x.id === pid)
    return {
      productId: pid,
      name: p.name,
      price: p.price,
      quantity: qty,
      template: p.template,
    }
  }

  const proposals = [
    {
      id: 'seed-pr-1',
      clientId: 'seed-c-1',
      status: 'borrador',
      title: 'Ampliación CCTV sede norte',
      items: [line('seed-p-1', 1), line('seed-p-3', 12)],
      total: 4_200_000 + 12 * 280_000,
      createdAt: '2025-03-01T10:00:00.000Z',
    },
    {
      id: 'seed-pr-2',
      clientId: 'seed-c-2',
      status: 'enviada',
      title: 'Renovación tiendas 2025',
      items: [line('seed-p-1', 2), line('seed-p-5', 1)],
      total: 2 * 4_200_000 + 2_400_000,
      createdAt: '2025-02-14T14:30:00.000Z',
    },
    {
      id: 'seed-pr-3',
      clientId: 'seed-c-3',
      status: 'vista',
      title: 'Acceso planta principal',
      items: [line('seed-p-2', 3)],
      total: 3 * 3_100_000,
      createdAt: '2025-01-28T09:15:00.000Z',
    },
    {
      id: 'seed-pr-4',
      clientId: 'seed-c-1',
      status: 'negociando',
      title: 'NVR central + enlaces',
      items: [line('seed-p-4', 1), line('seed-p-3', 40)],
      total: 5_800_000 + 40 * 280_000,
      createdAt: '2025-01-10T11:00:00.000Z',
    },
    {
      id: 'seed-pr-5',
      clientId: 'seed-c-4',
      status: 'cerrada',
      title: 'Cableado y CCTV conjunto',
      items: [line('seed-p-1', 1), line('seed-p-3', 80), line('seed-p-5', 1)],
      total: 4_200_000 + 80 * 280_000 + 2_400_000,
      createdAt: '2024-12-05T16:45:00.000Z',
    },
    {
      id: 'seed-pr-6',
      clientId: 'seed-c-2',
      status: 'perdida',
      title: 'Piloto zona sur',
      items: [line('seed-p-2', 1)],
      total: 3_100_000,
      createdAt: '2024-11-20T10:20:00.000Z',
    },
    {
      id: 'seed-pr-7',
      clientId: 'seed-c-3',
      status: 'enviada',
      title: 'Auditoría de red industrial',
      items: [line('seed-p-3', 24), line('seed-p-5', 1)],
      total: 24 * 280_000 + 2_400_000,
      createdAt: '2024-11-02T08:00:00.000Z',
    },
    {
      id: 'seed-pr-8',
      clientId: 'seed-c-4',
      status: 'vista',
      title: 'Propuesta integral portería',
      items: [line('seed-p-1', 2), line('seed-p-2', 2)],
      total: 2 * 4_200_000 + 2 * 3_100_000,
      createdAt: '2024-10-15T13:30:00.000Z',
    },
  ]

  return { clients, products, proposals }
}
