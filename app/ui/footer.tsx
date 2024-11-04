import React from 'react';

export default function Footer() {
  return (
    <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center font-[family-name:var(--font-roboto-mono)]'>
      <span className='text-xs'>Bryan Brotonel {new Date().getFullYear()}</span>
    </footer>
  );
}
