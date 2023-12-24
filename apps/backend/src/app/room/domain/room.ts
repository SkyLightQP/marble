import { nanoid } from 'nanoid';
import { RedisClientType } from 'redis';

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

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
      members: this.members
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }

  public static fromJSON(json: string): Room {
    const { id, name, owner, members } = JSON.parse(json);
    return new Room(id, name, owner, members);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    await redis.set(this.id, this.toString());
  }
}
