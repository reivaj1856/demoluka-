import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const cashflow = [
  { name: 'Lun', ingresos: 520, gastos: 320 },
  { name: 'Mar', ingresos: 760, gastos: 410 },
  { name: 'Mié', ingresos: 690, gastos: 380 },
  { name: 'Jue', ingresos: 980, gastos: 530 },
  { name: 'Vie', ingresos: 820, gastos: 610 },
  { name: 'Sáb', ingresos: 1040, gastos: 720 },
  { name: 'Dom', ingresos: 880, gastos: 460 },
]

const activity = [
  { label: 'Pago enviado', amount: -120.0, when: 'Hoy' },
  { label: 'Ingreso recibido', amount: 850.0, when: 'Ayer' },
  { label: 'Transferencia', amount: -60.0, when: 'Hace 2 días' },
  { label: 'Suscripción', amount: -9.99, when: 'Hace 3 días' },
]

function formatMoney(amount: number) {
  const sign = amount < 0 ? '-' : ''
  const value = Math.abs(amount)
  return `${sign}$ ${value.toFixed(2)}`
}

export default function DashboardPage() {
  const balance = 12480.25
  const ingresosMes = 4120.0
  const gastosMes = 2980.5
  const pagosPendientes = 3

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-muted">Resumen general (datos demo).</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Balance</div>
          <div className="mt-2 text-xl font-semibold">$ {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Ingresos (mes)</div>
          <div className="mt-2 text-xl font-semibold">$ {ingresosMes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Gastos (mes)</div>
          <div className="mt-2 text-xl font-semibold">$ {gastosMes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Pagos pendientes</div>
          <div className="mt-2 text-xl font-semibold">{pagosPendientes}</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-bg/30 p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Ingresos vs Gastos</div>
              <div className="text-xs text-text-muted">Últimos 7 días</div>
            </div>
            <div className="text-xs text-text-muted">USD</div>
          </div>

          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflow} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="ingresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B21B6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#5B21B6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="rgba(35, 40, 92, 0.7)" strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fill: '#B9B7E6' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B9B7E6' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#111327',
                    border: '1px solid #23285C',
                    borderRadius: 12,
                    color: '#E9E8FF',
                  }}
                  labelStyle={{ color: '#B9B7E6' }}
                />

                <Area type="monotone" dataKey="ingresos" stroke="#22D3EE" fill="url(#ingresos)" strokeWidth={2} />
                <Area type="monotone" dataKey="gastos" stroke="#5B21B6" fill="url(#gastos)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-sm font-medium">Actividad reciente</div>
          <ul className="mt-3 space-y-2 text-sm">
            {activity.map((a) => (
              <li key={`${a.label}-${a.when}`} className="flex items-center justify-between">
                <div>
                  <div className="text-text">{a.label}</div>
                  <div className="text-xs text-text-muted">{a.when}</div>
                </div>
                <div className={a.amount < 0 ? 'text-text' : 'text-accent'}>{formatMoney(a.amount)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
