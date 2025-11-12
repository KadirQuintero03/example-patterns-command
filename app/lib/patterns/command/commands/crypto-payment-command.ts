import { PaymentCommand } from "../payment-command.interface"
import { CryptoPaymentService } from "@/app/lib/services/crypto-payment.service"

export class CryptoPaymentCommand implements PaymentCommand {
    constructor(private service: CryptoPaymentService) { }

    execute(amount: number): void {
        // este es el comando que pasa la llamada al objeto que tiene la logica de negocio
        // aqui se parametriza la solicitud que debe ser pasada al objeto con la logica de negocioi
        if (amount < 0) {
            console.log("❌ Monto no aceptado debe ser mayor a 0.")
            return
        }
        this.service.process(amount)
    }
}
