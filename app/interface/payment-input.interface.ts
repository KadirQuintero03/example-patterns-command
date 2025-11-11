export interface PaymentInputProps {
    value: string
    onChange: (value: string) => void
    onPay: () => void
    disabled: boolean
}
