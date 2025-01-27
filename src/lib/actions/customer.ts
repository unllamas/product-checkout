'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

export async function addCustomer(props: { name: string; email: string; pubkey: string }): Promise<string> {
  const { name, email, pubkey } = props;

  // Find if customer exist
  const query = {
    customer: {
      $: {
        where: {
          email,
          pubkey,
        },
      },
    },
  };

  const { customer } = await db.query(query);

  if (customer && customer.length > 0) {
    return customer[0]?.id;
  }

  // If not exist, create
  const newId = id();

  await db.transact(
    db.tx.customer[newId].update({
      name: name ?? null,
      email: email ?? null,
      pubkey: pubkey ?? null,
      createdAt: Date.now(),
    }),
  );

  return newId;
}
