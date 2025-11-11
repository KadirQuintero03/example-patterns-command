// Interfaz Command
export interface PaymentCommand {
  execute(amount: number): void
}

// Receptor: los servicios reales que procesan el pago
export class CardPaymentService {
  process(amount: number): void {
    console.log(`💳 Procesando pago con tarjeta por $${amount}`)
  }
}

export class BankTransferService {
  process(amount: number): void {
    console.log(`🏦 Procesando transferencia bancaria por $${amount}`)
  }
}

export class CryptoPaymentService {
  process(amount: number): void {
    console.log(`🪙 Procesando pago con criptomonedas por $${amount}`)
  }
}

// Comandos concretos
export class CardPaymentCommand implements PaymentCommand {
  constructor(private service: CardPaymentService) { }
  execute(amount: number): void {
    this.service.process(amount)
  }
}

export class BankTransferCommand implements PaymentCommand {
  constructor(private service: BankTransferService) { }
  execute(amount: number): void {
    this.service.process(amount)
  }
}

export class CryptoPaymentCommand implements PaymentCommand {
  constructor(private service: CryptoPaymentService) { }
  execute(amount: number): void {
    this.service.process(amount)
  }
}

// Invocador: el contexto que decide qué comando usar
export class PaymentProcessor {
  private command: PaymentCommand | null = null

  setCommand(command: PaymentCommand): void {
    this.command = command
  }

  pay(amount: number): void {
    if (!this.command) {
      console.log("❌ No se ha definido un método de pago.")
      return
    }
    console.log("💰 Iniciando proceso de pago...")
    this.command.execute(amount)
  }
}
