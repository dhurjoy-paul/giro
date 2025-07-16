import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import LoadingHash from '../../../components/shared/LoadingHash'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import './stripePayment.css'

const StripePayment = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()

  const [booking, setBooking] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const [cardError, setCardError] = useState(null)

  // Fetch booking by ID
  useEffect(() => {
    if (!id) return
    const fetchBooking = async () => {
      try {
        const res = await axiosSecure.get(`/bookings/${id}`)
        setBooking(res.data)
      } catch (err) {
        toast.error('Failed to load booking')
      }
    }
    fetchBooking()
  }, [id, axiosSecure])

  // Create PaymentIntent
  useEffect(() => {
    if (!booking) return
    const createIntent = async () => {
      try {
        const { data } = await axiosSecure.post('/create-payment-intent', {
          bookId: booking._id
        })
        setClientSecret(data.clientSecret)
      } catch (err) {
        toast.error('Stripe intent failed')
      }
    }
    createIntent()
  }, [booking, axiosSecure])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setProcessing(true)
    const card = elements.getElement(CardElement)
    if (!card) return

    // 1. Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: user?.displayName || 'Unknown User',
        email: user?.email || 'No Email',
      },
    })

    if (error) {
      setCardError(error.message)
      setProcessing(false)
      return
    } else {
      setCardError(null)
    }

    // 2. Confirm card payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      }
    })

    if (confirmError) {
      setCardError(confirmError.message)
      setProcessing(false)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      // 3. Save payment in booking
      try {
        const res = await axiosSecure.post('/payments', {
          bookingId: booking._id,
          transactionId: paymentIntent.id,
          email: user?.email
        })

        if (res.data?.message) {
          toast.success('Payment successful!')
          navigate('/dashboard/my-bookings')
        } else {
          toast.error('Payment recorded but booking update failed')
        }
      } catch (err) {
        toast.error('Payment success but DB update failed')
      } finally {
        setProcessing(false)
      }
    }
  }

  if (!booking) return <LoadingHash />

  return (
    // <div className="max-w-lg mx-auto mt-12 px-6 py-8 bg-white dark:bg-black border rounded-lg shadow-md">
    //   <h2 className="text-2xl font-bold mb-4 text-center">
    //     Payment for: <span className="text-brand">{booking.packageName}</span>
    //   </h2>

    //   <p className="text-center text-lg mb-6">
    //     Tour Date: {new Date(booking.date).toLocaleDateString()}
    //   </p>

    //   <p className="text-center text-xl font-semibold mb-6">
    //     Amount Due: ৳ {booking.price}
    //   </p>

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <CardElement
    //       options={{
    //         style: {
    //           base: {
    //             fontSize: '16px',
    //             color: '#424770',
    //             '::placeholder': { color: '#aab7c4' },
    //           },
    //           invalid: { color: '#9e2146' },
    //         },
    //       }}
    //     />

    //     {cardError && <p className="text-red-500">{cardError}</p>}

    //     <button
    //       type="submit"
    //       disabled={!stripe || processing || !clientSecret}
    //       className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition disabled:opacity-50"
    //     >
    //       {processing
    //         ? <ClipLoader size={22} color="#fff" />
    //         : `Pay ৳${booking.price}`
    //       }
    //     </button>
    //   </form>
    // </div>


    <div className="max-w-xl mx-auto mt-16 px-6">
      <div className="relative rounded-xl border border-emerald-500 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-neutral-900 dark:to-neutral-800 shadow-lg p-8 overflow-hidden">
        {/* Top Glow */}
        <div className="absolute -top-2 -left-2 h-24 w-24 bg-emerald-300 opacity-20 blur-2xl rounded-full pointer-events-none" />
        {/* Bottom Glow */}
        <div className="absolute -bottom-2 -right-2 h-24 w-24 bg-emerald-400 opacity-20 blur-2xl rounded-full pointer-events-none" />

        <h2 className="text-3xl font-extrabold text-center text-emerald-700 dark:text-emerald-400 mb-4">
          Pay for <span className="text-brand">{booking.packageName}</span>
        </h2>

        <p className="text-center text-lg text-muted-foreground mb-1">
          Tour Date: <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
        </p>

        <p className="text-center text-xl font-bold text-foreground mb-6">
          Amount Due: ৳ {booking.price}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-5 rounded-xl border border-emerald-500 bg-gradient-to-br from-black/60 via-black/70 to-black/80 backdrop-blur-lg shadow-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#e5e7eb', // light text on dark bg
                    fontFamily: 'Inter, sans-serif',
                    '::placeholder': {
                      color: '#9ca3af'
                    },
                    fontWeight: 'bold'
                  },
                  invalid: {
                    color: '#f87171',
                    fontWeight: 'semibold'
                  },
                },
              }}
            />
          </div>


          {cardError && <p className="text-red-500 font-semibold text-lg">{cardError}</p>}

          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className="w-full py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold tracking-wide transition disabled:opacity-50"
          >
            {processing ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              `Pay ৳${booking.price}`
            )}
          </button>
        </form>
      </div>
    </div>
  )


}

export default StripePayment
