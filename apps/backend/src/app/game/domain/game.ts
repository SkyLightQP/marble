import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { Player } from '@/app/player/domain/player';
import { DotColor, DotColorTuple } from '@/app/player/types/dot-color';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';
import { shuffle } from '@/infrastructure/utils/random.util';

export interface GameStatus {
  readonly nickname: string;
  readonly color: DotColor;
  money: number;
  land: number;
  house: number;
  building: number;
  hotel: number;
  position: number;
  haveCities: string[];
}

export interface GameFields {
  roomId: string;
  turn: number;
  playerOrder: Player[];
  currentOrderPlayerIndex: number;
  playerStatus: Record<string, GameStatus>;
}

export class Game extends SyncableToRedis {
  private constructor(
    public roomId: string,
    public turn: number,
    public playerOrder: Player[],
    public currentOrderPlayerIndex: number,
    public playerStatus: Record<string, GameStatus>
  ) {
    super();
  }

  public static create(roomId: string, players: Player[]): Game {
    const currentPlayer = shuffle(players);
    const colors: DotColorTuple = ['red', 'blue', 'green', 'yellow'];
    const randomColors = [...colors].sort(() => Math.random() - 0.5);
    const defaultStatus = players.reduce(
      (prev, player, currentIndex) => ({
        ...prev,
        [player.userId]: {
          nickname: player.nickname,
          color: randomColors[currentIndex],
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
    return new Game(roomId, 1, currentPlayer, 0, defaultStatus);
  }

  public removePlayer(userId: string): void {
    this.playerOrder = this.playerOrder.filter((player) => player.userId !== userId);
    delete this.playerStatus[userId];
  }

  public increaseCurrentOrderPlayerIndex(): void {
    this.currentOrderPlayerIndex = (this.currentOrderPlayerIndex + 1) % this.playerOrder.length;
  }

  public toJSON(): GameFields {
    return {
      roomId: this.roomId,
      turn: this.turn,
      playerOrder: this.playerOrder,
      currentOrderPlayerIndex: this.currentOrderPlayerIndex,
      playerStatus: this.playerStatus
    };
  }

  public toString(): string {
    return assertStringify<GameFields>(this.toJSON());
  }

  public static fromJSON(json: string): Game {
    const { roomId, turn, playerOrder, currentOrderPlayerIndex, playerStatus } = assertParse<GameFields>(json);
    return new Game(roomId, turn, playerOrder, currentOrderPlayerIndex, playerStatus);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await super.syncRedis(redis, 'game', this.roomId);
  }
}
