import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { Player } from '@/app/player/domain/player';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';
import { shuffle } from '@/infrastructure/utils/random.util';

export interface GameStatus {
  readonly nickname: string;
  readonly money: number;
  readonly land: number;
  readonly house: number;
  readonly building: number;
  readonly hotel: number;
  readonly position: number;
  readonly haveCities: string[];
}

export interface GameFields {
  roomId: string;
  turn: number;
  playerOrder: Player[];
  currentTurnPlayer: string;
  playerStatus: Record<string, GameStatus>;
}

export class Game extends SyncableToRedis {
  private constructor(
    public roomId: string,
    public turn: number,
    public playerOrder: Player[],
    public currentTurnPlayer: string,
    public playerStatus: Record<string, GameStatus>
  ) {
    super();
  }

  public static create(roomId: string, players: Player[]): Game {
    const currentPlayer = shuffle(players);
    const defaultStatus = players.reduce(
      (prev, player) => ({
        ...prev,
        [player.userId]: {
          nickname: player.nickname,
          money: 0,
          land: 0,
          house: 0,
          building: 0,
          hotel: 0,
          position: 0,
          haveCities: []
        }
      }),
      {}
    );
    return new Game(roomId, 1, currentPlayer, currentPlayer[0].userId, defaultStatus);
  }

  public toJSON(): GameFields {
    return {
      roomId: this.roomId,
      turn: this.turn,
      playerOrder: this.playerOrder,
      currentTurnPlayer: this.currentTurnPlayer,
      playerStatus: this.playerStatus
    };
  }

  public toString(): string {
    return assertStringify<GameFields>(this.toJSON());
  }

  public static fromJSON(json: string): Game {
    const { roomId, turn, playerOrder, currentTurnPlayer, playerStatus } = assertParse<GameFields>(json);
    return new Game(roomId, turn, playerOrder, currentTurnPlayer, playerStatus);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await super.syncRedis(redis, 'game', this.roomId);
  }
}
