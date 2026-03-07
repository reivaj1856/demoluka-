'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Payment } from '../../../lib/payments'
import { listPayments } from '../../../lib/payments'

function formatMoney(amount: number) {
  return `$ ${amount.toFixed(2)}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

export default function TransactionsPage() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState<Payment[]>([])

  useEffect(() => {
    setItems(listPayments())
  }, [])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return items
    return items.filter(
      (p) =>
        p.description.toLowerCase().includes(query) ||
        p.to.toLowerCase().includes(query) ||
        p.status.toLowerCase().includes(query),
    )
  }, [items, q])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Transacciones</h1>
          <p className="mt-1 text-sm text-text-muted">Vista unificada (derivada de Pagos).</p>
        </div>

        <label className="w-full sm:w-72">
          <span className="sr-only">Buscar</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por descripción, para, estado..."
            className="w-full rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </header>

      <div className="rounded-2xl border border-border bg-bg/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium">Movimientos</div>
          <a className="text-sm text-accent hover:underline" href="/app/payments">
            Ir a Pagos →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-text-muted">
              <tr className="border-b border-border">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Detalle</th>
                <th className="py-2 pr-4">Contraparte</th>
                <th className="py-2 pr-4">Monto</th>
                <th className="py-2 pr-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="py-3 pr-4 text-text-muted">{formatDate(p.createdAt)}</td>
                  <td className="py-3 pr-4">{p.description}</td>
                  <td className="py-3 pr-4 text-text-muted">{p.to}</td>
                  <td className="py-3 pr-4 font-semibold">{formatMoney(p.amount)}</td>
                  <td className="py-3 pr-2">
                    <span className="rounded-full border border-border bg-bg/40 px-2 py-1 text-xs">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-sm text-text-muted">
                    No hay resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}