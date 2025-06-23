import React from 'react';

export default function Footer() {
  return (
    <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center font-[family-name:var(--font-roboto-mono)]'>
      <span className='text-xs'>
        <a
          href='https://bryanbrotonel.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Bryan Brotonel
        </a>
      </span>
    </footer>
  );
}
