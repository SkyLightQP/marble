export interface GetRoomResponse {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly players: string[];
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
  readonly players: string[];
  readonly maxPlayer: number;
  readonly isPlaying: boolean;
}
