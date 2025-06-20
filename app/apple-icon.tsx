import { ImageResponse } from 'next/og';
import AppIcon from './ui/AppIcon';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/svg+xml';

export default function Icon() {
  return new ImageResponse(<AppIcon size={32} />, size);
}