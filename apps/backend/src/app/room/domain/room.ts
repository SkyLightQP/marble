import { WsException } from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';
import { ErrorCode } from '@/infrastructure/error/error-code';

interface RoomFields {
  readonly id: string;
  name: string;
  owner: string;
  players: string[];
  maxPlayer: number;
  isPlaying: boolean;
}

export class Room extends SyncableToRedis {
  private constructor(
    public readonly id: string,
    public name: string,
    public owner: string,
    public players: string[],
    public maxPlayer: number,
    public isPlaying: boolean
  ) {
    super();
  }

  public static create(name: string, owner: string, maxPlayer: number): Room {
    return new Room(nanoid(), name, owner, [owner], maxPlayer, false);
  }

  public addPlayers(uid: string): void {
    if (this.players.includes(uid)) {
      throw new WsException(ErrorCode.PLAYER_ALREADY_EXISTS);
    }
    this.players.push(uid);
  }

  public removePlayers(uid: string): void {
    if (!this.players.includes(uid)) {
      throw new WsException(ErrorCode.PLAYER_NOT_FOUND);
    }
    if (this.owner === uid) {
      const newOwner = this.players[0];
      this.owner = newOwner;
    }
    this.players = this.players.filter((member) => member !== uid);
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
