"use client"

export function CardPaymentAnimation() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center perspective">
      <style>{`
        @supports (transform: rotateY(1deg)) {
          .card-3d { perspective: 1000px; }
        }
      `}</style>

      {/* Tarjeta deslizándose y girando */}
      <div className="card-3d relative w-32 h-20">
        {/* Card that slides and rotates */}
        <div className="absolute animate-card-slide">
          <div className="w-32 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center text-white font-mono text-sm border border-blue-300">
            <span className="text-2xl">💳</span>
          </div>
        </div>

        {/* Card reader slots */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-24 bg-gradient-to-b from-transparent via-slate-400 to-transparent opacity-40"></div>
        </div>
      </div>

      {/* Metallic shine effect that follows the card */}
      <div className="absolute animate-card-spin opacity-30">
        <div className="w-32 h-20 bg-gradient-to-tr from-transparent via-white to-transparent rounded-lg"></div>
      </div>
    </div>
  )
}
