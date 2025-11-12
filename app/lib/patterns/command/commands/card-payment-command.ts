import { PaymentCommand } from "../payment-command.interface"
import { CardPaymentService } from "@/app/lib/services/card-payment.service"

export class CardPaymentCommand implements PaymentCommand {
    constructor(private service: CardPaymentService) { }

    execute(amount: number): void {
        if (amount < 0) {
            console.log("❌ Monto no aceptado debe ser mayor a 0.")
            return
        }
        this.service.process(amount)
    }
}
