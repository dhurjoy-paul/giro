import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripePayment from './StripePayment'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment />
    </Elements>
  )
}

export default Payment