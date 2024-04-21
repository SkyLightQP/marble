import api from '@marble/api';
import { DotColor } from '@/types/DotColor';

export interface PlayerResponse {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
  readonly socketClientId: string;
  readonly isDisable: boolean;
  readonly isReady: boolean;
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

export type CreateRoomResponse = GetRoomResponse;

export type UpdateRoomResponse = GetRoomResponse;

export type CityType = 'land' | 'house' | 'building' | 'hotel';

export interface GameStatusResponse {
  readonly nickname: string;
  readonly color: DotColor;
  readonly money: number;
  readonly land: number;
  readonly house: number;
  readonly building: number;
  readonly hotel: number;
  readonly position: number;
  readonly haveCities: Record<number, CityType[]>;
}

export interface GameResponse {
  readonly roomId: string;
  readonly turn: number;
  readonly playerOrder: PlayerResponse[];
  readonly currentOrderPlayerIndex: number;
  playerStatus: Record<string, GameStatusResponse>;
  cityWhoHave: Record<number, string>;
}

export interface RequestBuyCityResponse {
  city: Awaited<ReturnType<typeof api.functional.city.getCityById>>;
}

export interface PenaltyResponse {
  city: Awaited<ReturnType<typeof api.functional.city.getCityById>>;
  ownerNickname: string;
  penalty: number;
}

export interface BuyCityResponse {
  game: GameResponse;
  city: Awaited<ReturnType<typeof api.functional.city.getCityById>>;
}
