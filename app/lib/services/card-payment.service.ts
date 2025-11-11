export class CardPaymentService {
    process(amount: number): void {
        console.log(`💳 Procesando pago con tarjeta por $${amount}`)
    }
}
