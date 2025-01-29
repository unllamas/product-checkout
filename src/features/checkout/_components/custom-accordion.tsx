'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { addCustomer } from '@/lib/actions/customer';
import { addOrder, modifyOrder } from '@/lib/actions/order';
import { generatePayment, listenPayment } from '@/lib/actions/payment';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

import { CHECKOUT, COMPANY } from '@/mock';

type InformationProps = {
  onComplete: (id: any) => void;
};

export function Information({ onComplete }: InformationProps) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [variant, setVariant] = useState<'email' | 'pubkey'>('email');
  const [pubkey, setPubkey] = useState('');

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    if (variant === 'email' && (!name || !email)) return;
    if (variant === 'pubkey' && !pubkey) return;

    const id = await addCustomer({ name, email, pubkey });

    onComplete(id);
  }

  return (
    <form className='flex flex-col gap-6 px-4' onSubmit={onSubmit}>
      <div className='flex flex-col gap-4'>
        {variant === 'email' ? (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name *</Label>
              <Input
                id='name'
                type='text'
                placeholder='Satoshi'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email *</Label>
              <Input
                id='email'
                type='email'
                placeholder='satoshi@bitcoin.org'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <div className='grid gap-2'>
            <Label htmlFor='pubkey'>Pubkey *</Label>
            <Input
              id='pubkey'
              type='text'
              placeholder='NIP-05, npub or hex format'
              value={pubkey}
              onChange={(e) => setPubkey(e.target.value)}
              required
            />
          </div>
        )}
        <Button
          className='w-full'
          disabled={(variant === 'email' ? !name || !email : !pubkey) || loading}
          type='submit'
        >
          {loading ? 'Generating invoice...' : CHECKOUT.submit_type === 'donate' ? 'Donate' : 'Pay'}
        </Button>
        <div className='flex items-center gap-2 px-4'>
          <div className='w-full h-[1px] bg-gray-300'></div>
          <span className='text-sm text-muted-foreground'>or</span>
          <div className='w-full h-[1px] bg-gray-300'></div>
        </div>
        {variant === 'email' ? (
          <Button
            className='w-full'
            variant='secondary'
            onClick={() => {
              setName('');
              setEmail('');
              setVariant('pubkey');
            }}
          >
            Continue with Nostr
          </Button>
        ) : (
          <Button
            className='w-full'
            variant='secondary'
            onClick={() => {
              setPubkey('');
              setVariant('email');
            }}
          >
            Continue with Email
          </Button>
        )}
      </div>
    </form>
  );
}

function Copyable({ value, label }: { value: string; label: string }) {
  const [disabled, setDisabled] = useState(false);
  const [copyLabel, setCopyLabel] = useState(label);

  return (
    <CopyToClipboard text={value}>
      <Button
        className='w-full'
        variant='secondary'
        onClick={() => {
          setCopyLabel('Copied!');
          setDisabled(true);
          setTimeout(() => {
            setCopyLabel(label);
            setDisabled(false);
          }, 2500);
        }}
        disabled={disabled}
      >
        {copyLabel}
      </Button>
    </CopyToClipboard>
  );
}

type PaymentProps = {
  invoice: string;
};

export function Payment({ invoice }: PaymentProps) {
  return (
    <div className='flex flex-col items-center gap-4 px-4'>
      <p className='text-center text-muted-foreground'>
        Remember to pay with a Bitcoin wallet using Lightning Network.
      </p>
      <div className='p-2 md:p-4 bg-white rounded-lg'>
        {invoice ? <QRCodeSVG size={260} value={invoice} /> : <Skeleton className='w-[260px] h-[260px] bg-black' />}
      </div>
      <Copyable value={invoice} label='Copy Invoice' />
    </div>
  );
}

type SummaryProps = {
  onComplete: () => void;
};

export function Summary({ onComplete }: SummaryProps) {
  return (
    <div className='flex flex-col items-center gap-4 px-4'>
      <div className='flex justify-center items-center w-12 h-12 rounded-full bg-background'>
        <Heart className='size-4 text-green-500' />
      </div>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h3 className='font-semibold text-xl tracking-tighter text-balance'>Payment successful</h3>
        <p>
          Thank you for your contribution. <br />
          We have saved your information and will be receiving updates soon.
        </p>
      </div>
      <Button className='w-full' onClick={onComplete} asChild>
        <Link href={CHECKOUT?.success_url}>Go to Home</Link>
      </Button>
    </div>
  );
}

type Step = 'information' | 'payment' | 'summary';

export function CustomAccordion(props: any) {
  const { product, quantity, onActiveStep } = props;

  const [activeStep, setActiveStep] = useState<Step>('information');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

  const [orderId, setOrderId] = useState<string>('');
  const [invoice, setInvoice] = useState<string>('');
  const [verify, setVerify] = useState<string>('');

  useEffect(() => {
    if (orderId && verify) {
      listenPayment({
        verifyUrl: verify,
        intervalMs: 5000,
        maxRetries: 48,
        onPaymentConfirmed: async (isPaid) => {
          if (isPaid) {
            modifyOrder(orderId);
            handleComplete('payment');
          }
        },
        onPaymentFailed: () => {
          console.log('Payment verification failed after maximum retries.');
        },
      });
    }
  }, [orderId, verify]);

  const handleComplete = (step: Step) => {
    setCompletedSteps([...completedSteps, step]);
    const nextStep = getNextStep(step);
    if (nextStep) {
      onActiveStep(nextStep);
      setActiveStep(nextStep);
    }
  };

  const getNextStep = (currentStep: Step): Step | null => {
    const steps: Step[] = ['information', 'payment', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1] || null;
  };

  const isCompleted = (step: Step) => completedSteps.includes(step);

  const renderIcon = (step: Step) => {
    if (isCompleted(step)) return <Check className='size-4 text-green-500' />;
    switch (step) {
      case 'information':
        return <span className='text-sm text-muted-foreground'>1</span>;
      case 'payment':
        return <span className='text-sm text-muted-foreground'>2</span>;
      case 'summary':
        return <span className='text-sm text-muted-foreground'>3</span>;
    }
  };

  return (
    <Accordion type='single' value={activeStep} className='w-full max-w-md' {...props}>
      <AccordionItem value='information'>
        <AccordionTrigger className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-gray-100'>
              {renderIcon('information')}
            </div>
            <span>Information</span>
          </div>
          {/* {isCompleted('information') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Information
            onComplete={async (id) => {
              const _id = await addOrder({
                customer_id: id,
                amount: product?.price * quantity,
                currency: product?.currency,
                quantity,
              });

              setOrderId(_id);
              handleComplete('information');

              // General Payment
              const data = await generatePayment({
                lightningAddress: COMPANY?.lightningAddress,
                amount: product?.price * quantity,
              });

              setInvoice(data?.invoice?.pr);
              setVerify(data?.invoice?.verify);
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='payment'>
        <AccordionTrigger className='flex justify-between' disabled={!isCompleted('information')}>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-gray-100'>
              {renderIcon('payment')}
            </div>
            <span>Payment</span>
          </div>
          {/* {isCompleted('payment') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Payment invoice={invoice} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='summary'>
        <AccordionTrigger className='flex justify-between' disabled={!isCompleted('payment')}>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-gray-100'>
              {renderIcon('summary')}
            </div>
            <span>Summary</span>
          </div>
          {/* {isCompleted('summary') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Summary onComplete={() => handleComplete('summary')} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
