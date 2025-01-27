'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

interface AddOrder {
  customer_id: any;
  amount: number;
  currency: string;
}

export async function addOrder(props: AddOrder): Promise<string> {
  const { customer_id, amount, currency } = props;

  const newId = id();

  await db.transact(
    db.tx.order[newId].update({
      customer_id,

      amount: amount ?? null,
      currency: currency ?? null,
      paid: false,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    }),
  );

  return newId;
}

export async function modifyOrder(id: any): Promise<{ error: string | null }> {
  if (!id) return { error: 'ID required' };

  await db.transact(
    db.tx.order[id].update({
      paid: true,
      updatedAt: Date.now(),
    }),
  );

  return { error: null };
}
