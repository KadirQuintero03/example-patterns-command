"use client"

interface FlowVisualizationProps {
  active: boolean
  method: "card" | "bank" | "crypto"
}

export function FlowVisualization({ active, method }: FlowVisualizationProps) {
  const getMethodColor = (m: string) => {
    switch (m) {
      case "card":
        return "from-blue-500 to-blue-600"
      case "bank":
        return "from-green-500 to-green-600"
      case "crypto":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getMethodName = (m: string) => {
    switch (m) {
      case "card":
        return "CardPaymentCommand"
      case "bank":
        return "BankTransferCommand"
      case "crypto":
        return "CryptoPaymentCommand"
      default:
        return "Command"
    }
  }

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border overflow-hidden">
      {/* Timeline Flow */}
      <div className="flex items-center justify-between gap-2">
        {/* Step 1: Processor */}
        <div
          className={`flex-1 p-4 rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 text-white text-center font-semibold transition-all duration-300 ${
            active ? "shadow-lg shadow-slate-600/50 scale-105" : ""
          }`}
        >
          <div className="text-sm">PaymentProcessor</div>
          <div className="text-xs mt-1 opacity-80">setCommand()</div>
        </div>

        {/* Arrow 1 */}
        <div
          className={`w-12 h-1 bg-gradient-to-r from-slate-600 to-primary transition-all duration-300 ${
            active ? "shadow-lg shadow-primary/50" : ""
          }`}
        ></div>

        {/* Step 2: Command */}
        <div
          className={`flex-1 p-4 rounded-lg bg-gradient-to-r ${getMethodColor(method)} text-white text-center font-semibold transition-all duration-300 ${
            active ? "shadow-lg shadow-primary/50 scale-105" : ""
          }`}
        >
          <div className="text-sm">{getMethodName(method)}</div>
          <div className="text-xs mt-1 opacity-80">execute()</div>
        </div>

        {/* Arrow 2 */}
        <div
          className={`w-12 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
            active ? "shadow-lg shadow-accent/50" : ""
          }`}
        ></div>

        {/* Step 3: Service */}
        <div
          className={`flex-1 p-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center font-semibold transition-all duration-300 ${
            active ? "shadow-lg shadow-purple-600/50 scale-105" : ""
          }`}
        >
          <div className="text-sm">
            {method === "card" && "CardPaymentService"}
            {method === "bank" && "BankTransferService"}
            {method === "crypto" && "CryptoPaymentService"}
          </div>
          <div className="text-xs mt-1 opacity-80">process()</div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-sm font-semibold text-blue-600">✓ Desacoplamiento</div>
          <div className="text-xs text-muted-foreground mt-1">
            El invoker no conoce los detalles de la implementación
          </div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-sm font-semibold text-green-600">✓ Intercambio Runtime</div>
          <div className="text-xs text-muted-foreground mt-1">
            Cambia de comando en cualquier momento sin cambiar el invoker
          </div>
        </div>
        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-sm font-semibold text-purple-600">✓ Extensibilidad</div>
          <div className="text-xs text-muted-foreground mt-1">
            Agrega nuevos comandos sin modificar código existente
          </div>
        </div>
      </div>
    </div>
  )
}
