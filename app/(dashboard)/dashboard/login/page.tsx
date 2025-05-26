'use client';

import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { useActionState } from 'react';

export default function DashboardSignIn() {
  const [state, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        action={formAction}
        className='p-10 bg-white/10 rounded-lg shadow-md space-y-6 w-sm'
      >
        <div className='flex flex-col gap-4'>
          <input
            name='password'
            type='password'
            placeholder='password'
            className='border-2 border-primary p-2 rounded-md'
          />
        </div>
        <div>
          <button
            type='submit'
            disabled={pending}
            className='py-2 px-4 rounded-md bg-gray-200 text-black'
          >
            Sign In
          </button>
        </div>
        {state && <div className='text-red-500 text-sm'>{state}</div>}
      </form>

      <div className='mt-6'>
        <Link href={'/'}>
          <span className='text-gray-400 hover:underline font-medium transition-colors duration-150'>
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
