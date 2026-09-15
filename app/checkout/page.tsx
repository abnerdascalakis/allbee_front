import { CheckoutForm } from '@/components/cart/checkout-form'
import { SiteHeader } from '@/components/navbar'
import { SiteFooter } from '@/components/footer'

export default function Checkout() {
  return <><SiteHeader /><main className="flex-1"><CheckoutForm /></main><SiteFooter /></>
}
