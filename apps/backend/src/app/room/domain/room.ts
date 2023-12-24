import { nanoid } from 'nanoid';
import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';

interface RoomFields {
  readonly id: string;
  name: string;
  owner: string;
  members: string[];
}

export class Room {
  private constructor(
    public readonly id: string,
    public name: string,
    public owner: string,
    public members: string[]
  ) {}

  public static create(name: string, owner: string): Room {
    return new Room(nanoid(), name, owner, [owner]);
  }

  public addMember(uid: string): void {
    this.members.push(uid);
  }

  public removeMember(uid: string): void {
    this.members = this.members.filter((member) => member !== uid);
  }

  public toJSON(): RoomFields {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
      members: this.members
    };
  }

  public toString(): string {
    return assertStringify<RoomFields>(this.toJSON());
  }

  public static fromJSON(json: string): Room {
    const { id, name, owner, members } = assertParse<RoomFields>(json);
    return new Room(id, name, owner, members);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await redis.set(this.id, this.toString());
  }
}
