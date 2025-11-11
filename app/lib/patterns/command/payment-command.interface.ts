export interface PaymentCommand {
    execute(amount: number): void
}
