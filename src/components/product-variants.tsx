import { SatoshiV2Icon } from '@bitcoin-design/bitcoin-icons-react/filled';

import { formatBigNumbers } from '@/lib/number';
import { Label } from '@/components/ui/label';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export function ProductVariants({
  variants,
  onChange,
  selected,
  disabled,
}: {
  variants: any[];
  selected: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <RadioGroup defaultValue={selected} onValueChange={(value) => onChange(value)}>
      {variants?.map((variant) => (
        <Label
          className={cn('overflow-hidden flex w-full rounded-xl bg-background/5 border-background/10 border shadow-sm')}
          htmlFor={variant?.id}
        >
          <div className='flex items-start gap-4 w-full p-4'>
            <div className='mt-1'>
              <RadioGroupItem value={variant?.id} id={variant?.id} disabled={disabled} />
            </div>
            <div className='flex flex-col justify-center gap-1 w-full'>
              <div className='flex justify-between items-center w-full'>
                <h3>{variant?.name}</h3>
                <div className='flex items-center'>
                  <SatoshiV2Icon className='w-4 h-4' />
                  <p className=''>
                    <span className='font-semibold'>{formatBigNumbers(variant?.price)}</span>
                    <span className='ml-1 text-muted-foreground'>{variant?.currency}</span>
                  </p>
                </div>
              </div>
              {variant?.description && (
                <div className='flex flex-col'>
                  <p className='text-sm text-muted-foreground'>{variant?.description}</p>
                </div>
              )}
            </div>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
