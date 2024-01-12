import { WsException } from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { Player } from '@/app/player/domain/player';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';
import { ErrorCode } from '@/infrastructure/error/error-code';

interface RoomFields {
  readonly id: string;
  name: string;
  owner: string;
  players: Player[];
  maxPlayer: number;
  isPlaying: boolean;
}

export class Room extends SyncableToRedis {
  private constructor(
    public readonly id: string,
    public name: string,
    public owner: string,
    public players: Player[],
    public maxPlayer: number,
    public isPlaying: boolean
  ) {
    super();
  }

  public static create(name: string, owner: string, maxPlayer: number): Room {
    return new Room(nanoid(), name, owner, [], maxPlayer, false);
  }

  public addPlayer(player: Player): void {
    if (this.players.map(({ userId }) => userId).find((userId) => userId === player.userId)) {
      throw new WsException(ErrorCode.PLAYER_ALREADY_EXISTS);
    }
    this.players.push(player);
  }

  public removePlayer(userId: string): void {
    const player = this.players.find((member) => member.userId === userId);
    if (player === undefined) {
      throw new WsException(ErrorCode.PLAYER_NOT_FOUND);
    }
    if (this.players.length > 1 && this.owner === userId) {
      const newOwner = this.players[0];
      this.owner = newOwner.userId;
    }
    this.players = this.players.filter((p) => p.userId !== userId);
  }

  public toJSON(): RoomFields {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
      players: this.players,
      maxPlayer: this.maxPlayer,
      isPlaying: this.isPlaying
    };
  }

  public toString(): string {
    return assertStringify<RoomFields>(this.toJSON());
  }

  public static fromJSON(json: string): Room {
    const { id, name, owner, players, maxPlayer, isPlaying } = assertParse<RoomFields>(json);
    return new Room(id, name, owner, players, maxPlayer, isPlaying);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await super.syncRedis(redis, 'room', this.id);
  }
}
