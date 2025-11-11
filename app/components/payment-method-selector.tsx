"use client"

interface PaymentMethodSelectorProps {
  selected: string | null
  onSelect: (method: "card" | "bank" | "crypto") => void
}

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  const methods = [
    { id: "card", label: "Tarjeta", emoji: "💳", color: "from-blue-500 to-blue-600" },
    { id: "bank", label: "Transferencia", emoji: "🏦", color: "from-green-500 to-green-600" },
    { id: "crypto", label: "Cripto", emoji: "🪙", color: "from-orange-500 to-orange-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id as "card" | "bank" | "crypto")}
          className={`relative p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
            selected === method.id
              ? `border-primary bg-primary/10 shadow-lg shadow-primary/20`
              : "border-border bg-card hover:border-primary/50"
          }`}
        >
          <div className="space-y-3">
            <div className={`text-4xl ${method.emoji}`}></div>
            <h3 className="font-semibold text-foreground text-lg">{method.label}</h3>
            <p className="text-sm text-muted-foreground">
              {method.id === "card" && "Pago con tarjeta de crédito/débito"}
              {method.id === "bank" && "Transferencia entre cuentas bancarias"}
              {method.id === "crypto" && "Transacción con criptomonedas"}
            </p>
            {selected === method.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse-soft"></div>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
