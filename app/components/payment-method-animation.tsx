"use client"

import { CardPaymentAnimation } from "./card-payment-animation"
import { BankTransferAnimation } from "./bank-transfer-animation"
import { CryptoPaymentAnimation } from "./crypto-payment-animation"

import { PaymentMethodAnimationProps } from "../interface/payment-method-animation.interface"

export function PaymentMethodAnimation({ method, active }: PaymentMethodAnimationProps) {
  if (!active || !method) {
    return null
  }

  return (
    <div className="w-full p-6 bg-card rounded-lg border border-border">
      {method === "card" && <CardPaymentAnimation />}
      {method === "bank" && <BankTransferAnimation />}
      {method === "crypto" && <CryptoPaymentAnimation />}
    </div>
  )
}
