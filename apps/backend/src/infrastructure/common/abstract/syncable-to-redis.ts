import { RedisClientType } from 'redis';

export abstract class SyncableToRedis {
  abstract toString(): string;

  abstract toJSON(): unknown;

  protected async syncRedis(redis: RedisClientType, table: string, key: string): Promise<void> {
    await redis.hSet(table, key, this.toString());
  }
}
