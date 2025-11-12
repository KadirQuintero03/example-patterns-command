import { PaymentCommand } from "../payment-command.interface"
import { BankTransferService } from "@/app/lib/services/bank-transfer.service"

export class BankTransferCommand implements PaymentCommand {
    constructor(private service: BankTransferService) { }

    execute(amount: number): void {
        if (amount < 0) {
            console.log("❌ Monto no aceptado debe ser mayor a 0.")
            return
        }
        this.service.process(amount)
    }
}
