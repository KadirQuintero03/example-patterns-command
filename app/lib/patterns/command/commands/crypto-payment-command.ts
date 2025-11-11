import { PaymentCommand } from "../payment-command.interface"
import { CryptoPaymentService } from "@/app/lib/services/crypto-payment.service"

export class CryptoPaymentCommand implements PaymentCommand {
    constructor(private service: CryptoPaymentService) { }

    execute(amount: number): void {
        this.service.process(amount)
    }
}
