"use client"

import { PaymentInputProps } from "../interface/payment-input.interface"

export function PaymentInput({ value, onChange, onPay, disabled }: PaymentInputProps) {
  return (
    <div className="space-y-4 p-6 bg-card rounded-lg border border-border">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
          Monto del Pago
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-foreground">$</span>
          <input
            id="amount"
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            className="w-full pl-8 pr-4 py-2 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>
      </div>
      <button
        onClick={onPay}
        disabled={disabled || !value}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
          disabled || !value
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 active:scale-95"
        }`}
      >
        {disabled ? "⏳ Procesando..." : "💰 Ejecutar Pago"}
      </button>
    </div>
  )
}
