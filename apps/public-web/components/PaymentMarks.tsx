import Image from 'next/image';
export default function PaymentMarks({compact=false}:{compact?:boolean}){return <div className={`payment-marks ${compact?'compact':''}`} aria-label="Payment methods accepted"><Image src="/assets/payments-marks.svg" alt="Airtel Money, MTN Mobile Money, Visa and Mastercard" width={560} height={80}/></div>}
