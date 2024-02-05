import { City } from '@marble/backend/dist/src/app/city/domain/City';
import { GameStatus } from '@marble/backend/dist/src/app/game/domain/game';
import { DotColor } from '@/types/DotColor';

export interface PlayerResponse {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
}

export interface GetRoomResponse {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly players: PlayerResponse[];
  readonly maxPlayer: number;
  readonly isPlaying: boolean;
}

export type GetRoomsResponse = GetRoomResponse[];

export interface WebSocketError {
  readonly code: string;
  readonly message: string;
}

export interface CreateRoomResponse {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly players: PlayerResponse[];
  readonly maxPlayer: number;
  readonly isPlaying: boolean;
}

export interface CityResponse {
  readonly cityId: number;
  readonly land: number;
  readonly house: number | -1;
  readonly building: number | -1;
  readonly hotel: number | -1;
}

export interface GameStatusResponse {
  readonly nickname: string;
  readonly color: DotColor;
  readonly money: number;
  readonly land: number;
  readonly house: number;
  readonly building: number;
  readonly hotel: number;
  readonly position: number;
  readonly haveCities: Record<number, City>;
}

export interface GameResponse {
  readonly roomId: string;
  readonly turn: number;
  readonly playerOrder: PlayerResponse[];
  readonly currentOrderPlayerIndex: number;
  playerStatus: Record<string, GameStatus>;
  cityWhoHave: Record<number, string>;
}
