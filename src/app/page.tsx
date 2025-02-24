import type { Metadata } from 'next';

import { CheckoutProvider } from '@/components/checkout/checkout-provider';

import { STORE, PRODUCT } from '@/mock';

export async function generateMetadata(): Promise<Metadata> {
  const store = STORE;

  return {
    title: `${store.name} | Checkout`,
  };
}

export default function Page() {
  return <CheckoutProvider store={{ ...STORE, lnaddress: STORE.lnaddress || "" }} product={PRODUCT} />;
}
