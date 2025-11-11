"use client"

export function EducationalPanel() {
  return (
    <div className="w-full lg:w-80 space-y-6 lg:sticky lg:top-6 lg:h-fit">
      {/* Main Card */}
      <div className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg border border-primary/20 shadow-lg">
        <h3 className="text-xl font-bold mb-4">🎓 Patrón Command</h3>
        <p className="text-sm leading-relaxed opacity-90">
          El patrón Command encapsula solicitudes como objetos, permitiendo parametrizar clientes con diferentes
          solicitudes, encolar solicitudes y registrar solicitudes.
        </p>
      </div>

      {/* Components */}
      <div className="p-6 bg-card rounded-lg border border-border space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <span>⚙️</span> Componentes
        </h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-foreground">1. Command (Interfaz)</p>
            <p className="text-muted-foreground text-xs mt-1">Define la interfaz para ejecutar una acción</p>
          </div>
          <div>
            <p className="font-medium text-foreground">2. ConcreteCommand</p>
            <p className="text-muted-foreground text-xs mt-1">Implementa la acción usando el Receptor</p>
          </div>
          <div>
            <p className="font-medium text-foreground">3. Receiver (Servicio)</p>
            <p className="text-muted-foreground text-xs mt-1">Realiza el trabajo real de la solicitud</p>
          </div>
          <div>
            <p className="font-medium text-foreground">4. Invoker (Processor)</p>
            <p className="text-muted-foreground text-xs mt-1">Ejecuta el comando sin conocer detalles</p>
          </div>
        </div>
      </div>

      {/* Ventajas */}
      <div className="p-6 bg-card rounded-lg border border-border space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <span>✨</span> Ventajas
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Desacopla el solicitante del ejecutor</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Permite encolar y programar comandos</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Facilita implementar undo/redo</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Mayor flexibilidad y extensibilidad</span>
          </li>
        </ul>
      </div>

      {/* Casos de Uso */}
      <div className="p-6 bg-card rounded-lg border border-border space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <span>🎯</span> Casos de Uso
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Sistemas de procesamiento de pagos</li>
          <li>• Máquinas expendedoras</li>
          <li>• Colas de tareas</li>
          <li>• Botones de undo/redo</li>
          <li>• Macros y scripts</li>
        </ul>
      </div>
    </div>
  )
}
