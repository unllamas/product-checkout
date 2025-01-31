import { CheckoutProvider } from '@/components/checkout/checkout-provider';

import { STORE, PRODUCT } from '@/mock';

export default function Page() {
  return <CheckoutProvider store={STORE} product={PRODUCT} />;
}
