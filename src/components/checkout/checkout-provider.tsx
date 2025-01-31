'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SatoshiV2Icon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { formatBigNumbers } from '@/lib/number';

import { Footer } from '@/components/footer';

import { CustomAccordion } from './custom-accordion';

import { StoreType, ProductType } from '@/types';
import { Skeleton } from '../ui/skeleton';

export function CheckoutProvider({
  store,
  product,
  readOnly = false,
}: {
  store: StoreType;
  product: ProductType;
  readOnly?: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex-1 flex flex-col md:flex-row'>
      {/* Data */}
      <div className='flex flex-col w-full bg-foreground text-background'>
        <div className='flex flex-row gap-4 w-full h-14 px-4'>
          <div className='flex items-center gap-4 w-full max-w-xl mx-auto'>
            {store?.website ? (
              <Link className='flex items-center gap-2' href={store?.website}>
                {readOnly && !store?.image && <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />}
                {store?.image && (
                  <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
                    <img src={store?.image} alt={store?.name} />
                  </div>
                )}
                <div className='flex-1 flex'>
                  <span className='font-semibold tracking-tighter text-balance'>{store?.name}</span>
                </div>
              </Link>
            ) : (
              <div className='flex items-center gap-2'>
                {readOnly && !store?.image && <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />}
                {store?.image && (
                  <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
                    <img src={store?.image} alt={store?.name} />
                  </div>
                )}
                <div className='flex-1 flex'>
                  <span className='font-semibold tracking-tighter text-balance'>{store?.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-6 w-full max-w-md mx-auto px-4 py-8 md:py-12'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <h1 className='font-semibold tracking-tighter text-balance'>{product?.name}</h1>
                {/* {product?.variants?.length === 0 && ( */}
                <p className='flex items-center text-lg tracking-tighter text-balance'>
                  <SatoshiV2Icon className='w-4 h-4' />
                  <span className='font-semibold'>{formatBigNumbers(Number(product?.price) * quantity)}</span>
                  <span className='ml-1 text-muted-foreground'>{product?.currency}</span>
                </p>
                {/* )} */}
                {/* {product?.variants?.length === 0 && (
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
                  )} */}
              </div>
              {readOnly && !product?.image && <Skeleton className='w-full h-[280px] bg-gray-200 rounded-xl' />}
              {product?.image && (
                <div className='relative overflow-hidden flex justify-center items-center max-h-[280px] rounded-xl'>
                  <img src={product?.image} alt={product?.name} />
                </div>
              )}

              {readOnly && !product?.description && <Skeleton className='w-[220px] h-[14px] bg-gray-200 rounded-xl' />}
              {product?.description && (
                <div className='flex flex-col gap-4'>
                  <p className='text-sm' dangerouslySetInnerHTML={{ __html: product?.description }} />
                </div>
              )}
            </div>

            {/* Divider */}
            {/* <div className='w-full h-[1px] bg-muted opacity-10'></div> */}

            {/* {product?.variants?.length > 0 && (
              <ProductVariants
                onChange={setSelected}
                selected={product?.variants[0]?.id}
                variants={product?.variants}
                disabled={disabled}
              />
            )} */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex-1 flex w-full max-w-md h-full px-4 py-8 md:py-24'>
          <CustomAccordion readOnly={readOnly} quantity={quantity} store={store} product={product} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
