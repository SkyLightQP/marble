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

export interface GameStatusResponse {
  readonly money: number;
  readonly land: number;
  readonly house: number;
  readonly building: number;
  readonly hotel: number;
  readonly position: number;
  readonly haveCities: string[];
}

export interface GameResponse {
  readonly roomId: string;
  readonly turn: number;
  readonly playerOrder: string[];
  readonly currentTurnPlayer: string;
  readonly playerStatus: Record<string, GameStatusResponse>;
}
