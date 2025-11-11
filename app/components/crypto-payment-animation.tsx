"use client"

export function CryptoPaymentAnimation() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center gap-8">
      {/* Left Coin */}
      <div className="flex flex-col items-center">
        <div className="text-5xl animate-coin-spin">🪙</div>
        <span className="text-xs text-muted-foreground mt-2">Blockchain A</span>
      </div>

      {/* Connection Animation */}
      <div className="relative w-32 h-20 flex items-center justify-center">
        {/* Blockchain block connection */}
        <div className="absolute animate-blockchain-connect">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded border-2 border-orange-300 flex items-center justify-center text-white text-xs font-bold">
            ⛓️
          </div>
        </div>

        {/* Connection line with gradient */}
        <svg className="absolute w-full h-12" viewBox="0 0 128 48" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234, 179, 8, 0.3)" />
              <stop offset="50%" stopColor="rgba(234, 179, 8, 0.8)" />
              <stop offset="100%" stopColor="rgba(234, 179, 8, 0.3)" />
            </linearGradient>
          </defs>

          {/* Curved connection path */}
          <path
            d="M 8 24 Q 64 8 120 24"
            fill="none"
            stroke="url(#gradientLine)"
            strokeWidth="2"
            strokeDasharray="4,4"
            opacity="0.6"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Right Coin */}
      <div className="flex flex-col items-center">
        <div className="text-5xl animate-coin-spin" style={{ animationDelay: "0.5s" }}>
          🪙
        </div>
        <span className="text-xs text-muted-foreground mt-2">Blockchain B</span>
      </div>
    </div>
  )
}
