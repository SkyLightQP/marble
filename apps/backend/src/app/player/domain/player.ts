interface PlayerFields {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
}

export class Player {
  private constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly nickname: string
  ) {}

  public static create(userId: string, id: string, nickname: string): Player {
    return new Player(userId, id, nickname);
  }
}
