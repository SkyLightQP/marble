import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { Player } from '@/app/player/domain/player';
import { DotColor, DotColorTuple } from '@/app/player/types/dot-color';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';
import { CityType } from '@/infrastructure/common/types/city-type.type';
import { shuffle } from '@/infrastructure/utils/random.util';

type CityId = number;
type UserId = string;

export interface GameStatus {
  readonly nickname: string;
  readonly color: DotColor;
  money: number;
  land: number;
  house: number;
  building: number;
  hotel: number;
  position: number;
  haveCities: Record<CityId, CityType[]>;
}

export interface GameFields {
  readonly roomId: string;
  turn: number;
  playerOrder: Player[];
  currentOrderPlayerIndex: number;
  playerStatus: Record<UserId, GameStatus>;
  cityWhoHave: Record<CityId, UserId>;
}

export class Game extends SyncableToRedis {
  private constructor(
    public readonly roomId: string,
    public turn: number,
    public playerOrder: Player[],
    public currentOrderPlayerIndex: number,
    private playerStatus: Record<UserId, GameStatus>,
    public cityWhoHave: Record<CityId, UserId>
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
          money: 10000,
          land: 0,
          house: 0,
          building: 0,
          hotel: 0,
          position: 0,
          haveCities: {}
        } as GameStatus
      }),
      {}
    );
    return new Game(roomId, 1, currentPlayer, 0, defaultStatus, {});
  }

  public removePlayer(userId: string): void {
    this.playerOrder = this.playerOrder.filter((player) => player.userId !== userId);
    delete this.playerStatus[userId];
  }

  public getPlayerStatus(userId: string): GameStatus {
    return this.playerStatus[userId];
  }

  public increaseCurrentOrderPlayerIndex(): void {
    this.currentOrderPlayerIndex = (this.currentOrderPlayerIndex + 1) % this.playerOrder.length;
    if (this.playerOrder[this.currentOrderPlayerIndex].isDisable) {
      this.increaseCurrentOrderPlayerIndex();
    }
  }

  public removeCitiesWhoHavePlayer(userId: string): void {
    const deletedCity = Object.entries(this.cityWhoHave).find(([, id]) => id === userId) ?? [];
    deletedCity.forEach(([cityId]) => {
      delete this.cityWhoHave[cityId];
    });
    deletedCity.forEach(([cityId]) => {
      delete this.getPlayerStatus(userId).haveCities[cityId];
    });
  }

  public giveMoney(userId: string, money: number): void {
    this.getPlayerStatus(userId).money += money;
  }

  public takeMoney(userId: string, money: number): void {
    this.getPlayerStatus(userId).money -= money;
  }

  public getPlayersNotDisable(): Player[] {
    return this.playerOrder.filter((player) => !player.isDisable);
  }

  public toJSON(): GameFields {
    return {
      roomId: this.roomId,
      turn: this.turn,
      playerOrder: this.playerOrder,
      currentOrderPlayerIndex: this.currentOrderPlayerIndex,
      playerStatus: this.playerStatus,
      cityWhoHave: this.cityWhoHave
    };
  }

  public toString(): string {
    return assertStringify<GameFields>(this.toJSON());
  }

  public static fromJSON(json: string): Game {
    const { roomId, turn, playerOrder, currentOrderPlayerIndex, playerStatus, cityWhoHave } =
      assertParse<GameFields>(json);
    return new Game(
      roomId,
      turn,
      playerOrder.map((p) => Player.fromObject(p)),
      currentOrderPlayerIndex,
      playerStatus,
      cityWhoHave
    );
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await super.syncRedis(redis, 'game', this.roomId);
  }
}
