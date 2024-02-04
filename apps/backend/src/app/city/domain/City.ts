export class City {
  private constructor(
    public readonly cityId: number,
    public readonly land: number,
    public house: number | -1,
    public building: number | -1,
    public hotel: number | -1
  ) {}

  public static create(
    cityId: number,
    land: number,
    house: number | -1,
    building: number | -1,
    hotel: number | -1
  ): City {
    return new City(cityId, land, house, building, hotel);
  }
}
