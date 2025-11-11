"use client"

import { useState } from "react"
import { PaymentMethodSelector } from "./components/payment-method-selector"
import { PaymentInput } from "./components/payment-input"
import { PaymentHistory } from "./components/payment-history"
import { FlowVisualization } from "./components/flow-visualization"
import { EducationalPanel } from "./components/educational-panel"
import { PaymentMethodAnimation } from "./components/payment-method-animation"
import {
  PaymentProcessor,
  CardPaymentCommand,
  BankTransferCommand,
  CryptoPaymentCommand,
  CardPaymentService,
  BankTransferService,
  CryptoPaymentService,
} from "./lib/command-pattern"

interface PaymentRecord {
  id: string
  type: "card" | "bank" | "crypto"
  amount: number
  timestamp: Date
  status: "success" | "error"
  message: string
}

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | "crypto" | null>(null)
  const [amount, setAmount] = useState<string>("")
  const [history, setHistory] = useState<PaymentRecord[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [flowActive, setFlowActive] = useState(false)

  const processor = new PaymentProcessor()
  const cardService = new CardPaymentService()
  const bankService = new BankTransferService()
  const cryptoService = new CryptoPaymentService()

  const handleSelectMethod = (method: "card" | "bank" | "crypto") => {
    setSelectedMethod(method)
    // Set appropriate command
    if (method === "card") {
      processor.setCommand(new CardPaymentCommand(cardService))
    } else if (method === "bank") {
      processor.setCommand(new BankTransferCommand(bankService))
    } else if (method === "crypto") {
      processor.setCommand(new CryptoPaymentCommand(cryptoService))
    }
  }

  const handlePay = async () => {
    if (!selectedMethod || !amount || Number.parseFloat(amount) <= 0) {
      const newRecord: PaymentRecord = {
        id: Date.now().toString(),
        type: selectedMethod || "card",
        amount: Number.parseFloat(amount) || 0,
        timestamp: new Date(),
        status: "error",
        message: "❌ Selecciona un método y un monto válido",
      }
      setHistory([newRecord, ...history])
      return
    }

    setIsProcessing(true)
    setFlowActive(true)

    // Simulate processing with animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const numAmount = Number.parseFloat(amount)
    const methodEmojis = { card: "💳", bank: "🏦", crypto: "🪙" }
    const methodNames = { card: "Tarjeta", bank: "Transferencia Bancaria", crypto: "Criptomonedas" }

    const newRecord: PaymentRecord = {
      id: Date.now().toString(),
      type: selectedMethod,
      amount: numAmount,
      timestamp: new Date(),
      status: "success",
      message: `${methodEmojis[selectedMethod]} Pago procesado: $${numAmount.toFixed(2)} - ${methodNames[selectedMethod]}`,
    }

    setHistory([newRecord, ...history])
    setAmount("")
    setFlowActive(false)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Visualizador del Patrón Command</h1>
            <p className="text-muted-foreground">Explora cómo el patrón Command desacopla la solicitud del ejecutor</p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Fase 1: Configuración</h2>
            <p className="text-sm text-muted-foreground">Selecciona un método de pago → Se ejecuta setCommand()</p>
            <PaymentMethodSelector selected={selectedMethod} onSelect={handleSelectMethod} />
          </div>

          {/* Payment Input */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Fase 2: Especificación del Monto</h2>
            <PaymentInput value={amount} onChange={setAmount} onPay={handlePay} disabled={isProcessing} />
          </div>

          {/* Flow Visualization */}
          {selectedMethod && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Fase 3: Ejecución del Flujo</h2>
              <p className="text-sm text-muted-foreground">
                Animación del patrón: PaymentProcessor → Command → Service
              </p>
              <FlowVisualization active={flowActive} method={selectedMethod} />
            </div>
          )}

          {/* Payment Method Animation */}
          {selectedMethod && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Animación del Método de Pago</h2>
              <PaymentMethodAnimation method={selectedMethod} active={flowActive} />
            </div>
          )}

          {/* Payment History */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Historial de Pagos</h2>
            <PaymentHistory records={history} />
          </div>
        </div>

        {/* Educational Sidebar */}
        <EducationalPanel />
      </div>
    </div>
  )
}
