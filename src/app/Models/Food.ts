export class Food {
  constructor(
    public id: number = null,
    public name: string = '',
    public type: string = '',
    public weight: number = null,
    public price: number = null,
    public description: string,
    public picture: string,
    public quantity: number = null,
  ) {
  }
}
