import Image from 'next/image';

export default function AppIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fbfbf2',
        padding: 3,
      }}
    >
      <Image
        src='/images/logo.svg'
        alt="Bryan's Archive Logo"
        width={100}
        height={100}
        priority
      />
    </div>
  );
}
