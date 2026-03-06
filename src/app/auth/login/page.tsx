export default function LoginPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface shadow-card p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
          <span className="text-xs text-text-muted">
            Demo
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
          </span>
        </div>

        <p className="mt-2 text-sm text-text-muted">
          Email: <span className="text-text">demo@lukademo.app</span> · Password:{' '}
          <span className="text-text">Demo1234!</span>
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

          <label className="block">
            <span className="text-sm text-text-muted">Password</span>
            <input
              type="password"
              placeholder="Demo1234!"
              className="mt-1 w-full rounded-xl border border-border bg-bg/40 px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-xl bg-primary px-3 py-2 font-medium hover:bg-primary-600"
          >
            Entrar
          </button>

          <div className="flex items-center justify-between text-sm">
            <a className="text-accent hover:underline" href="/auth/forgot-password">
              ¿Olvidaste tu clave?
            </a>
            <a className="text-text-muted hover:text-text hover:underline" href="/auth/register">
              Crear cuenta
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}