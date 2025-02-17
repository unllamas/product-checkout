'use client';

import Link from 'next/link';
import { init } from '@instantdb/react';
import { Button } from '@/components/ui/button';

const APP_ID = process.env.INSTANTDB_KEY || '';
const db = init({ appId: APP_ID });

export default function Page() {
  const query = { order: {}, customer: {} };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading) {
    return;
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center gap-4 w-screen h-screen'>
        <h2 className='text-2xl font-semibold'>Oops, error querying data</h2>
        <p className='text-sm text-muted-foreground'>{error.message}</p>
        <Button asChild>
          <Link href='/'>Go to Home</Link>
        </Button>
      </div>
    );
  }

  const { order, customer } = data;
  const ordersTab = order.map((theOrder) => {
    return<>
    <tr>
    <td><pre>{theOrder.id}</pre></td>
    <td><pre>
        {new Date(theOrder.createdAt).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </pre></td>
    <td>{customer?.filter((elCustomer: any) => elCustomer.id === theOrder.customer_id)[0].name}</td>
    <td>{theOrder.paid ? 'SI': 'NO'}</td>
  </tr>
  </>
  });

  return (
    <>
        <table className='text-center'>
        <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Pago ?</th>
            <th>Check-in</th>
        </tr>
        {ordersTab}
        </table>
        
    </>
  );
}
