export interface PaymentMethodSelectorProps {
    selected: string | null
    onSelect: (method: "card" | "bank" | "crypto") => void
}
