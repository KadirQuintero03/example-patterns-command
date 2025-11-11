export interface PaymentRecord {
    id: string
    type: "card" | "bank" | "crypto"
    amount: number
    timestamp: Date
    status: "success" | "error"
    message: string
}

export interface PaymentHistoryProps {
    records: PaymentRecord[]
}
