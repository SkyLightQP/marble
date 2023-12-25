import { ErrorCode } from '@infrastructure/error/error-code';
import { WsException } from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';

interface RoomFields {
  readonly id: string;
  name: string;
  owner: string;
  players: string[];
}

export class Room {
  private constructor(
    public readonly id: string,
    public name: string,
    public owner: string,
    public players: string[]
  ) {}

  public static create(name: string, owner: string): Room {
    return new Room(nanoid(), name, owner, [owner]);
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
    this.players = this.players.filter((member) => member !== uid);
  }

  public toJSON(): RoomFields {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
      players: this.players
    };
  }

  public toString(): string {
    return assertStringify<RoomFields>(this.toJSON());
  }

  public static fromJSON(json: string): Room {
    const { id, name, owner, players } = assertParse<RoomFields>(json);
    return new Room(id, name, owner, players);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await redis.set(`room:${this.id}`, this.toString());
  }
}
