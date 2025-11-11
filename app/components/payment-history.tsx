"use client"

interface PaymentRecord {
  id: string
  type: "card" | "bank" | "crypto"
  amount: number
  timestamp: Date
  status: "success" | "error"
  message: string
}

interface PaymentHistoryProps {
  records: PaymentRecord[]
}

export function PaymentHistory({ records }: PaymentHistoryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="space-y-3 p-6 bg-card rounded-lg border border-border max-h-80 overflow-y-auto">
      {records.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-muted-foreground">No hay pagos aún. ¡Ejecuta tu primer pago!</p>
        </div>
      ) : (
        records.map((record) => (
          <div
            key={record.id}
            className={`p-4 rounded-lg border transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
              record.status === "success" ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{record.message}</p>
                <p className="text-xs text-muted-foreground mt-1">⏰ {formatTime(record.timestamp)}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-foreground">${record.amount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
