'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SatoshiV2Icon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { formatBigNumbers } from '@/lib/number';
import { cn } from '@/lib/utils';

import { CustomAccordion } from '@/components/custom-accordion';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';

import { COMPANY, PRODUCT } from '@/mock';

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  const [disabledCheckout, setDisabledCheckout] = useState(false);

  return (
    <div className='flex flex-col md:flex-row w-screen h-screen'>
      <div className='flex items-center flex-col w-full bg-foreground text-background'>
        <div className='flex flex-col gap-6 w-full max-w-md px-4 py-8 md:py-12'>
          <div className='flex flex-col gap-6'>
            <div className={cn('flex gap-4', PRODUCT?.image ? 'flex-row' : 'flex-col')}>
              {COMPANY?.image && (
                <div className='relative overflow-hidden w-12 h-12 bg-background rounded-full'>
                  <img src={COMPANY?.image} alt={COMPANY?.name} />
                </div>
              )}
              <div className='flex-1 flex'>
                <div className='flex-1 flex flex-col'>
                  <p className='text-sm text-muted-foreground'>Pay to</p>
                  <Link className='flex items-center gap-2' href={COMPANY?.website}>
                    <span className='text-xl font-semibold tracking-tighter text-balance'>{COMPANY?.name}</span>
                  </Link>
                </div>
                <Button variant='ghost' size='icon'>
                  <Link href={COMPANY?.website}>
                    <ExternalLink />
                  </Link>
                </Button>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              {PRODUCT?.image && (
                <div className='max-h-[280px]'>
                  <img className='max-w-full h-full rounded-xl' src={PRODUCT?.image} alt={PRODUCT?.name} />
                </div>
              )}
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold tracking-tighter text-balance'>{PRODUCT?.name}</h1>
                  <div className='flex items-center gap-4'>
                    <Button
                      size='icon'
                      variant={quantity <= 1 || disabledCheckout ? 'ghost' : 'default'}
                      disabled={quantity <= 1 || disabledCheckout}
                      onClick={() => {
                        if (!disabledCheckout) setQuantity(quantity - 1);
                      }}
                    >
                      -
                    </Button>
                    <p className='min-w-10 text-center text-md font-semibold'>
                      <span className='text-xs text-muted-foreground mr-1'>x</span>
                      {quantity}
                    </p>
                    <Button
                      size='icon'
                      variant={disabledCheckout ? 'ghost' : 'default'}
                      disabled={disabledCheckout}
                      onClick={() => {
                        if (!disabledCheckout) setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <p className='text-sm' dangerouslySetInnerHTML={{ __html: PRODUCT?.description }} />
              </div>
            </div>

            {/* Divider */}
            <div className='w-full h-[1px] bg-muted opacity-10'></div>

            {/* Total */}
            <div className='flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>Total</p>
              <h2 className='flex items-center text-lg tracking-tighter text-balance'>
                <SatoshiV2Icon className='w-4 h-4' />
                <span className='font-semibold'>{formatBigNumbers(PRODUCT?.price * quantity)}</span>
                <span className='ml-1 text-muted-foreground'>{PRODUCT?.currency}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex w-full max-w-md h-full px-4 py-8 md:py-24'>
          <CustomAccordion
            quantity={quantity}
            product={PRODUCT}
            onActiveStep={(value: string) => {
              if (value !== 'information') {
                setDisabledCheckout(true);
              }
            }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
