import { RedisClientType } from 'redis';
import { assertParse, assertStringify } from 'typia/lib/json';
import { SyncableToRedis } from '@/infrastructure/common/abstract/syncable-to-redis';

interface PlayerFields {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
  readonly socketClientId: string;
  isReady: boolean;
  isDisable: boolean;
}

export class Player extends SyncableToRedis {
  private constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly nickname: string,
    public readonly socketClientId: string,
    public isReady: boolean,
    public isDisable: boolean
  ) {
    super();
  }

  public static create(userId: string, id: string, nickname: string, socketClientId: string): Player {
    return new Player(userId, id, nickname, socketClientId, false, false);
  }

  public toggleReady(): void {
    this.isReady = !this.isReady;
  }

  public toJSON(): PlayerFields {
    return {
      userId: this.userId,
      id: this.id,
      nickname: this.nickname,
      socketClientId: this.socketClientId,
      isReady: this.isReady,
      isDisable: this.isDisable
    };
  }

  public toString(): string {
    return assertStringify<PlayerFields>(this.toJSON());
  }

  public static fromJSON(json: string): Player {
    const { userId, id, nickname, socketClientId, isReady, isDisable } = assertParse<PlayerFields>(json);
    return new Player(userId, id, nickname, socketClientId, isReady, isDisable);
  }

  public static fromObject(json: PlayerFields): Player {
    const { userId, id, nickname, socketClientId, isReady, isDisable } = json;
    return new Player(userId, id, nickname, socketClientId, isReady, isDisable);
  }

  public async syncRedis(redis: RedisClientType): Promise<void> {
    throw new Error('Player domain is only use with Room domain.');
  }
}
