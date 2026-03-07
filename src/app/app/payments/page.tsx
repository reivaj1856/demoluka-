'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Payment, PaymentStatus } from '../../../lib/payments'
import { addPayment, deletePayment, listPayments, updatePaymentStatus } from '../../../lib/payments'

function formatMoney(amount: number) {
  return `$ ${amount.toFixed(2)}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [desc, setDesc] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    setPayments(listPayments())
  }, [])

  const totals = useMemo(() => {
    const completed = payments
      .filter((p) => p.status === 'completed')
      .reduce((acc, p) => acc + p.amount, 0)
    const pending = payments
      .filter((p) => p.status === 'pending')
      .reduce((acc, p) => acc + p.amount, 0)
    return { completed, pending }
  }, [payments])

  function refresh() {
    setPayments(listPayments())
  }

  function onCreate() {
    const amt = Number(amount)
    if (!desc.trim() || !to.trim() || !Number.isFinite(amt) || amt <= 0) return

    addPayment({ description: desc, to, amount: amt, status: 'pending' })
    refresh()
    setDesc('')
    setTo('')
    setAmount('')
  }

  function onSetStatus(id: string, status: PaymentStatus) {
    updatePaymentStatus(id, status)
    refresh()
  }

  function onDelete(id: string) {
    deletePayment(id)
    refresh()
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Pagos</h1>
        <p className="mt-1 text-sm text-text-muted">
          Crear pagos y ver historial (persistencia en localStorage).
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-bg/30 p-4 lg:col-span-2">
          <div className="text-sm font-medium">Nuevo pago</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-text-muted">Descripción</span>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ej: Pago de servicios"
                className="mt-1 w-full rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm text-text-muted">Para</span>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Ej: Edenorte / Juan Pérez"
                className="mt-1 w-full rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm text-text-muted">Monto</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
                placeholder="Ej: 120.00"
                className="mt-1 w-full rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={onCreate}
                className="w-full rounded-xl bg-primary px-3 py-2 text-sm font-medium hover:bg-primary-600"
              >
                Crear pago
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg/30 p-4">
          <div className="text-sm font-medium">Resumen</div>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Pagos completados</dt>
              <dd className="font-semibold">{formatMoney(totals.completed)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Pagos pendientes</dt>
              <dd className="font-semibold">{formatMoney(totals.pending)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Total registros</dt>
              <dd className="font-semibold">{payments.length}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg/30 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Historial</div>
          <a className="text-sm text-accent hover:underline" href="/app/transactions">
            Ver en Transacciones →
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-text-muted">
              <tr className="border-b border-border">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Descripción</th>
                <th className="py-2 pr-4">Para</th>
                <th className="py-2 pr-4">Monto</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="py-3 pr-4 text-text-muted">{formatDate(p.createdAt)}</td>
                  <td className="py-3 pr-4">{p.description}</td>
                  <td className="py-3 pr-4 text-text-muted">{p.to}</td>
                  <td className="py-3 pr-4 font-semibold">{formatMoney(p.amount)}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-border bg-bg/40 px-2 py-1 text-xs">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onSetStatus(p.id, 'completed')}
                        className="rounded-lg border border-border bg-bg/40 px-2 py-1 text-xs hover:bg-bg/60"
                      >
                        Completar
                      </button>
                      <button
                        type="button"
                        onClick={() => onSetStatus(p.id, 'failed')}
                        className="rounded-lg border border-border bg-bg/40 px-2 py-1 text-xs hover:bg-bg/60"
                      >
                        Fallar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(p.id)}
                        className="rounded-lg border border-border bg-bg/40 px-2 py-1 text-xs hover:bg-bg/60"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-sm text-text-muted">
                    No hay pagos todavía.
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