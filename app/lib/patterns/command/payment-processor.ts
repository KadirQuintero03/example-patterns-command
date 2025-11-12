import { BankTransferCommand, BankTransferService } from "../../command-pattern"
import { PaymentCommand } from "./payment-command.interface"

export class PaymentProcessor {
    private command: PaymentCommand | null = null
    constructor(){
        this.command = this.command
        this.setCommand = this.setCommand.bind(this)
    }
    setCommand(command: PaymentCommand): void {
        this.command = command
    }

    pay(amount: number): void {
        if (!this.command) {
            console.log(this.command);
            
            console.log("❌ No se ha definido un método de pago.")
            return
        }

        console.log("💰 Iniciando proceso de pago...")
        this.command.execute(amount)
    }
}

const service = new BankTransferService() // receptor -> optiene la logica de negocio real
const command = new BankTransferCommand(service) // comadn concreto que parametriza la solicitud para luego llamar a la logica ()
const payment = new PaymentProcessor()
payment.setCommand(command) // invocador recibe el contexto en tiempo de ejecucion de cual es el comando a utilizar
payment.pay(20000) // aqui simplemente pasa el argumento y llama al metodo generico implementado de la interfaz command


