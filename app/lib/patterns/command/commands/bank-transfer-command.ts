import { PaymentCommand } from "../payment-command.interface"
import { BankTransferService } from "@/app/lib/services/bank-transfer.service"

export class BankTransferCommand implements PaymentCommand {
    constructor(private service: BankTransferService) { }

    execute(amount: number): void {
        this.service.process(amount)
    }
}
