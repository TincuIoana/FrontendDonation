export class Donor{

  public id!:number;
  constructor(
    public firstName: string,
    public lastName: string,
    public additionalName: string,
    public maidenName: string,
  ) {
  }
}
