import { readFromStorage, writeToStorage } from './storage'

export type PaymentStatus = 'pending' | 'completed' | 'failed'

export type Payment = {
  id: string
  createdAt: string
  description: string
  to: string
  amount: number
  status: PaymentStatus
}

const STORAGE_KEY = 'luka_demo_payments_v1'

function seed(): Payment[] {
  const now = new Date()
  const daysAgo = (n: number) => {
    const d = new Date(now)
    d.setDate(d.getDate() - n)
    return d.toISOString()
  }

  return [
    {
      id: 'pmt_001',
      createdAt: daysAgo(0),
      description: 'Pago de servicios',
      to: 'Edenorte',
      amount: 120,
      status: 'completed',
    },
    {
      id: 'pmt_002',
      createdAt: daysAgo(1),
      description: 'Transferencia',
      to: 'Juan P��rez',
      amount: 60,
      status: 'completed',
    },
    {
      id: 'pmt_003',
      createdAt: daysAgo(2),
      description: 'Suscripción',
      to: 'Streaming+',
      amount: 9.99,
      status: 'pending',
    },
  ]
}

export function listPayments(): Payment[] {
  return readFromStorage<Payment[]>(STORAGE_KEY, seed())
}

export function savePayments(payments: Payment[]) {
  writeToStorage(STORAGE_KEY, payments)
}

export function addPayment(
  input: Omit<Payment, 'id' | 'createdAt' | 'status'> & { status?: PaymentStatus },
): Payment {
  const payments = listPayments()
  const payment: Payment = {
    id: `pmt_${Math.random().toString(16).slice(2)}_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: input.status ?? 'pending',
    description: input.description.trim(),
    to: input.to.trim(),
    amount: Number(input.amount),
  }
  const next = [payment, ...payments]
  savePayments(next)
  return payment
}

export function updatePaymentStatus(id: string, status: PaymentStatus) {
  const payments = listPayments()
  const next = payments.map((p) => (p.id === id ? { ...p, status } : p))
  savePayments(next)
}

export function deletePayment(id: string) {
  const payments = listPayments()
  const next = payments.filter((p) => p.id !== id)
  savePayments(next)
}