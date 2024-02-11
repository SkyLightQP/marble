interface PlayerFields {
  readonly userId: string;
  readonly id: string;
  readonly nickname: string;
  readonly socketClientId: string;
  readonly isDisable: boolean;
}

export class Player {
  private constructor(
    public userId: string,
    public id: string,
    public nickname: string,
    public socketClientId: string,
    public isDisable: boolean
  ) {}

  public static create(userId: string, id: string, nickname: string, socketClientId: string): Player {
    return new Player(userId, id, nickname, socketClientId, false);
  }
}
