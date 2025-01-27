'use client';

import Link from 'next/link';
import { init } from '@instantdb/react';
import { SatoshiV2Icon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { BadgeDollarSign, Contact, ReceiptText } from 'lucide-react';

import { formatBigNumbers } from '@/lib/number';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

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

  function calculateTotalRevenue(orders: any[]) {
    let total = 0;

    for (let i = 0; i < orders.length; i++) {
      total += orders[i]?.amount;
    }

    return total;
  }

  const orderPaids = order?.filter((order) => order.paid === true);
  const totalRevenue = calculateTotalRevenue(orderPaids);
  const countCustomers = customer?.length;
  const countOrders = order?.length;
  const countSales = (orderPaids?.length * 100) / order?.length;

  return (
    <>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 flex flex-col gap-4 container pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          </div>
          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center gap-1'>
                      <SatoshiV2Icon className='w-6 h-6' />
                      <div className='text-2xl font-bold'>{formatBigNumbers(totalRevenue)}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Customers</CardTitle>
                    <Contact className='w-6 h-6 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{countCustomers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Orders</CardTitle>
                    <ReceiptText className='w-6 h-6 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{countOrders}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <BadgeDollarSign className='w-6 h-6 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{countSales.toFixed(2)} %</div>
                  </CardContent>
                </Card>
              </div>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='aspect-video rounded-xl bg-muted/50' />
                <div className='aspect-video rounded-xl bg-muted/50' />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
