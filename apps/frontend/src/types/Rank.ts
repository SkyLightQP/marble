import { DotColor } from '@/types/DotColor';

export interface RankItem {
  readonly name: string;
  readonly color: DotColor;
  readonly price: number;
  readonly isMe?: boolean;
  readonly isDisable?: boolean;
}
