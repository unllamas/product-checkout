'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { SatoshiV2Icon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { formatBigNumbers } from '@/lib/number';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

import { CustomAccordion } from '@/components/custom-accordion';

import { COMPANY, PRODUCT } from '@/mock';

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  return (
    <div className='flex-1 flex flex-col md:flex-row'>
      {/* Data */}
      <div className='flex flex-col w-full bg-foreground text-background'>
        <div className='flex flex-row gap-4 w-full h-14 px-4'>
          <div className='flex items-center gap-4 w-full max-w-xl mx-auto'>
            <Link className='flex items-center gap-2' href={COMPANY?.website}>
              {COMPANY?.image && (
                <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
                  <img src={COMPANY?.image} alt={COMPANY?.name} />
                </div>
              )}
              <div className='flex-1 flex'>
                <span className='text-lg font-semibold tracking-tighter text-balance'>{COMPANY?.name}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-6 w-full max-w-md mx-auto px-4 py-8 md:py-12'>
          <div className='flex flex-col gap-6'>
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
                      variant={quantity <= 1 || disabled ? 'ghost' : 'default'}
                      disabled={quantity <= 1 || disabled}
                      onClick={() => {
                        if (!disabled) setQuantity(quantity - 1);
                      }}
                    >
                      <Minus />
                    </Button>
                    <p className='min-w-10 text-center text-md font-semibold'>
                      <span className='text-xs text-muted-foreground mr-1'>x</span>
                      {quantity}
                    </p>
                    <Button
                      size='icon'
                      variant={disabled ? 'ghost' : 'default'}
                      disabled={disabled}
                      onClick={() => {
                        if (!disabled) setQuantity(quantity + 1);
                      }}
                    >
                      <Plus />
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

      {/* Content */}
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex-1 flex w-full max-w-md h-full px-4 py-8 md:py-24'>
          <CustomAccordion
            quantity={quantity}
            product={PRODUCT}
            onActiveStep={(value: string) => {
              if (value !== 'information') {
                setDisabled(true);
              }
            }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
