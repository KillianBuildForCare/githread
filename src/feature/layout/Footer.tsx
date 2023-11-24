import { buttonVariants } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import clsx from 'clsx';
import { Home, PenSquare, User } from 'lucide-react';
import Link from 'next/link';

export const Footer = async () => {
  const session = await getAuthSession();

  return (
    <div className="py-2 flex justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-lg m-auto border-t border-accent">
      <Link
        href="/"
        className={clsx(
          buttonVariants({
            variant: 'ghost',
          }),
          'flex-1'
        )}
      >
        <Home size={16} />
      </Link>
      <Link
        href={ session?.user.id ? "/write" : '#'}
        className={clsx(
          buttonVariants({
            variant: 'ghost'
          }),
          'flex-1',
          {
            'opacity-30': !session?.user.id,
            'cursor-not-allowed': !session?.user.id,
          }
        )}
      >
        <PenSquare size={16} />
      </Link>
      <Link
        href={ session?.user.id ? "/profile" : '#'}
        className={clsx(
          buttonVariants({
            variant: 'ghost',
          }),
          'flex-1',
          {
            'opacity-30': !session?.user.id,
            'cursor-not-allowed': !session?.user.id,
          }
        )}
      >
        <User size={16} />
      </Link>
    </div>
  );
};