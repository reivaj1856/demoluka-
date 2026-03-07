import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
          {children}
        </section>
      </div>
    </div>
  )
}