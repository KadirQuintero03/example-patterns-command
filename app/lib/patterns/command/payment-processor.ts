import { PaymentCommand } from "./payment-command.interface"

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
