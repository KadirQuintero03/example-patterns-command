import { PaymentCommand } from "../payment-command.interface"
import { CardPaymentService } from "@/app/lib/services/card-payment.service"

export class CardPaymentCommand implements PaymentCommand {
    constructor(private service: CardPaymentService) { }

    execute(amount: number): void {
        this.service.process(amount)
    }
}
