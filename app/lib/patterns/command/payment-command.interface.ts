// interfaz command
export interface PaymentCommand {
    execute(amount: number): void
}
