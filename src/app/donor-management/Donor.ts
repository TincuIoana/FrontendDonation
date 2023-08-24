// export class Donor {
//   public id!: number;
//   constructor(
//     public firstName: string,
//     public lastName: string,
//     public additionalName: string,
//     public maidenName: string,
//   ) {
//   }
// }

export interface Donor {
  id?: number,
  firstName: string,
  lastName: string,
  additionalName: string,
  maidenName: string,
}
