import type { Metadata } from 'next';

import { getCheckout } from '@/lib/actions/checkout';

import { ProductCheckout } from '@/features/checkout/product-checkout';

export const metadata: Metadata = {
  title: 'Llamout - Payment System',
  description: 'By @unllamas',
};

export default async function Page() {
  const { company, product } = await getCheckout();

  return <ProductCheckout product={product} company={company} />;
}
