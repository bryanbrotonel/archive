import Image from 'next/image';
import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/svg+xml';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
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
    ),
    size
  );
}
