"use client"

export function BankTransferAnimation() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center gap-8">
      {/* Left Bank */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl animate-bounce">🏦</div>
        <span className="text-xs text-muted-foreground">Banco A</span>
      </div>

      {/* Transfer Animation Container */}
      <div className="relative w-32 h-12 flex items-center justify-center">
        {/* Moving bills/line */}
        <div className="absolute animate-bill-float">
          <span className="text-xl">💵</span>
        </div>

        {/* Transfer line with arrow */}
        <svg className="w-full h-1 absolute" viewBox="0 0 128 4" preserveAspectRatio="none">
          <line
            x1="0"
            y1="2"
            x2="128"
            y2="2"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8,8"
            opacity="0.3"
            className="animate-pulse"
          />
        </svg>

        {/* Arrow heads */}
        <div className="absolute left-1 text-green-500 text-lg">→</div>
      </div>

      {/* Right Bank */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>
          🏦
        </div>
        <span className="text-xs text-muted-foreground">Banco B</span>
      </div>
    </div>
  )
}
