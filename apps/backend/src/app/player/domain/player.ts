interface PlayerFields {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
  readonly socketClientId: string;
}

export class Player {
  private constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly nickname: string,
    public readonly socketClientId: string
  ) {}

  public static create(userId: string, id: string, nickname: string, socketClientId: string): Player {
    return new Player(userId, id, nickname, socketClientId);
  }
}
