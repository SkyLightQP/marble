import { DotColor } from '@/types/DotColor';

export const TEXT_COLOR_MAP: Record<DotColor | 'black', string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  black: 'text-black'
};

export const BACKGROUND_COLOR_MAP: Record<DotColor, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500'
};
