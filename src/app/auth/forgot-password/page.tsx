export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface shadow-card p-6">
        <h1 className="text-2xl font-semibold">Recuperar clave</h1>
        <p className="mt-1 text-sm text-text-muted">
          Flujo demo (sin envío real de email).
        </p>

        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-text-muted">Email</span>
            <input
              type="email"
              placeholder="demo@lukademo.app"
              className="mt-1 w-full rounded-xl border border-border bg-bg/40 px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-xl bg-primary px-3 py-2 font-medium hover:bg-primary-600"
          >
            Enviar link
          </button>

          <div className="flex items-center justify-between text-sm">
            <a className="text-accent hover:underline" href="/auth/login">
              Volver al login
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}