'use server';

import { CompanyType, ProductType } from '@/types';

import { COMPANY, PRODUCT } from '@/mock';

export async function getCheckout(): Promise<{ company: CompanyType; product: ProductType }> {
  return { company: COMPANY, product: PRODUCT };
}
