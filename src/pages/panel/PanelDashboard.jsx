import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { usePanelData } from '../../context/usePanelData.js'
import { PROPOSAL_STATUS_ORDER } from '../../context/panelConstants.js'
import { formatCop } from '../../utils/money.js'

/** Paleta alineada con sidebar: azul marca / header y dorado */
const BLUE_PRIMARY = '#3b66ad'
const BLUE_HEADER = '#0a1628'
const BLUE_MID = '#2d5282'
const GOLD = '#e8bc55'
const GOLD_SOFT = '#f0cd7a'
const GOLD_DEEP = '#c99a3d'

const PIE_COLORS = [BLUE_HEADER, BLUE_PRIMARY, BLUE_MID, GOLD, GOLD_SOFT, GOLD_DEEP]

function chartTooltipStyle() {
  return {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '12px',
  }
}

export default function PanelDashboard() {
  const { metrics, proposals } = usePanelData()

  const statusChartData = useMemo(() => {
    const counts = Object.fromEntries(PROPOSAL_STATUS_ORDER.map((s) => [s.id, 0]))
    proposals.forEach((p) => {
      counts[p.status] = (counts[p.status] ?? 0) + 1
    })
    return PROPOSAL_STATUS_ORDER.map((s) => ({
      nombre: s.label,
      cantidad: counts[s.id] ?? 0,
    }))
  }, [proposals])

  const pieChartData = useMemo(
    () =>
      statusChartData
        .filter((d) => d.cantidad > 0)
        .map((d) => ({ name: d.nombre, value: d.cantidad })),
    [statusChartData],
  )

  const monthlyChartData = useMemo(() => {
    const now = new Date()
    const list = []
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const mes = d.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' })
      const inMonth = proposals.filter((p) => {
        const t = new Date(p.createdAt)
        return t.getFullYear() === d.getFullYear() && t.getMonth() === d.getMonth()
      })
      const valor = inMonth.reduce((s, p) => s + p.total, 0)
      const propuestas = inMonth.length
      list.push({ mes, propuestas, valor })
    }
    return list
  }, [proposals])

  const cards = [
    { label: 'Propuestas enviadas', value: metrics.enviadas, hint: 'Columna “Enviada”', to: '/panel/propuestas' },
    { label: 'Propuestas vistas', value: metrics.vistas, hint: 'Columna “Vista”', to: '/panel/propuestas' },
    { label: 'Propuestas cerradas', value: metrics.cerradas, hint: 'Columna “Cerrada”', to: '/panel/propuestas' },
  ]

  const cardBox = 'rounded-md border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-header sm:text-3xl">Inicio</h1>
      <p className="mt-1 text-sm text-slate-600">Resumen y tendencias de propuestas</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className={cardBox}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-header">{c.value}</p>
            <p className="mt-2 text-xs text-slate-400">{c.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Propuestas por estado</h2>
          <p className="mt-0.5 text-xs text-slate-400">Cantidad en cada etapa del embudo</p>
          <div className="mt-4 h-72 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-25} textAnchor="end" height={70} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={chartTooltipStyle()} formatter={(v) => [v, 'Cantidad']} />
                <Bar dataKey="cantidad" name="Cantidad" radius={[2, 2, 0, 0]}>
                  {statusChartData.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={index % 2 === 0 ? BLUE_PRIMARY : GOLD} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Distribución</h2>
          <p className="mt-0.5 text-xs text-slate-400">Proporción por estado (con datos)</p>
          <div className="mt-4 h-72 w-full min-h-0">
            {pieChartData.length === 0 ? (
              <p className="flex h-full items-center justify-center text-sm text-slate-400">Sin datos para el gráfico</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={88}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle()} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Últimos 6 meses</h2>
        <p className="mt-0.5 text-xs text-slate-400">Valor estimado de propuestas creadas por mes (COP)</p>
        <div className="mt-4 h-80 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyChartData} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) =>
                  v >= 1e9 ? `${(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1e3)}k`
                }
              />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip
                contentStyle={chartTooltipStyle()}
                formatter={(value, name) =>
                  name === 'Valor (COP)' ? [formatCop(value), name] : [value, name]
                }
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="valor"
                name="Valor (COP)"
                stroke={BLUE_PRIMARY}
                strokeWidth={2}
                dot={{ r: 4, fill: BLUE_PRIMARY }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="propuestas"
                name="Nº propuestas"
                stroke={GOLD}
                strokeWidth={2}
                dot={{ r: 3, fill: GOLD }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Línea azul marca: suma de montos · Línea dorada: cantidad de propuestas nuevas en el mes
        </p>
      </div>
    </div>
  )
}
