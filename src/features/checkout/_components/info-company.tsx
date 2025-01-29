import Link from 'next/link';

export function InfoCompany({ company }: { company: { website: string; image: string; name: string } }) {
  return (
    <div className='flex flex-row gap-4 w-full h-14 px-4'>
      <div className='flex items-center gap-4 w-full max-w-xl mx-auto'>
        <Link className='flex items-center gap-2' href={company?.website}>
          {company?.image && (
            <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
              <img src={company?.image} alt={company?.name} />
            </div>
          )}
          <div className='flex-1 flex'>
            <span className='text-lg font-semibold tracking-tighter text-balance'>{company?.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
