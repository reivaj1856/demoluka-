export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-muted">Resumen general (datos demo).</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Balance</div>
          <div className="mt-2 text-xl font-semibold">$ 12,480.25</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Ingresos (mes)</div>
          <div className="mt-2 text-xl font-semibold">$ 4,120.00</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Gastos (mes)</div>
          <div className="mt-2 text-xl font-semibold">$ 2,980.50</div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-xs text-text-muted">Pagos pendientes</div>
          <div className="mt-2 text-xl font-semibold">3</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg/30 p-4">
        <div className="text-sm font-medium">Actividad reciente</div>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          <li>Pago enviado · $120.00 · Hoy</li>
          <li>Ingreso recibido · $850.00 · Ayer</li>
          <li>Transferencia · $60.00 · 2 días</li>
        </ul>
      </div>
    </div>
  )
}