import Link from 'next/link';

export function Footer() {
  return (
    <footer className='w-full bg-gray-100 body-font'>
      <div className='flex justify-center p-4'>
        <p className='text-muted-foreground text-sm text-center'>
          © 2025 Llamout —{' '}
          <Link className='border-b pb-1' rel='noopener noreferrer' target='_blank' href='https://x.com/unllamas'>
            @unllamas
          </Link>
          {' | adaptado a La Crypta por — '}
          <Link className='border-b pb-1' rel='noopener noreferrer' target='_blank' href='https://x.com/fierillo'>
            @fierillo
          </Link>
        </p>
      </div>
    </footer>
  );
}
