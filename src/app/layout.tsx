'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const targetHref = useMemo(() => {
    const q = query.trim()
    return q ? `/app/transactions?q=${encodeURIComponent(q)}` : '/app/transactions'
  }, [query])

  function goSearch() {
    router.push(targetHref)
  }

  return (
    <div className="min-h-dvh bg-bg text-text">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-border bg-surface shadow-card p-4">
          <div className="mb-4">
            <div className="text-lg font-semibold">Luka</div>
            <div className="text-xs text-text-muted">Fintech demo</div>
          </div>

          <nav className="space-y-1 text-sm">
            <a className="block rounded-xl px-3 py-2 hover:bg-bg/40" href="/app/dashboard">
              Dashboard
            </a>
            <a className="block rounded-xl px-3 py-2 hover:bg-bg/40" href="/app/transactions">
              Transacciones
            </a>
            <a className="block rounded-xl px-3 py-2 hover:bg-bg/40" href="/app/payments">
              Pagos
            </a>
            <a className="block rounded-xl px-3 py-2 hover:bg-bg/40" href="/app/accounts">
              Cuentas
            </a>
            <a className="block rounded-xl px-3 py-2 hover:bg-bg/40" href="/app/profile">
              Perfil
            </a>

            <div className="mt-3 border-t border-border pt-3">
              <a
                className="block rounded-xl px-3 py-2 text-text-muted hover:bg-bg/40 hover:text-text"
                href="/auth/login"
              >
                Cerrar sesión
              </a>
            </div>
          </nav>
        </aside>

        <section className="rounded-2xl border border-border bg-surface shadow-card p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold">Panel</div>
              <span className="hidden rounded-full border border-border bg-bg/30 px-2 py-1 text-xs text-text-muted md:inline">
                demo@lukademo.app
              </span>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
              <label className="w-full md:w-72">
                <span className="sr-only">Buscar</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') goSearch()
                  }}
                  placeholder="Buscar..."
                  className="w-full rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </label>

              <button
                type="button"
                onClick={goSearch}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/40 px-3 py-2 text-sm font-medium hover:bg-bg/60"
              >
                Buscar
              </button>

              <a
                href="/app/payments"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-medium hover:bg-primary-600"
              >
                Nuevo pago
              </a>
            </div>
          </div>

          {children}
        </section>
      </div>
    </div>
  )
}
