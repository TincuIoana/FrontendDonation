export class SigninResponse {
  constructor(
    public id:number,
    public firstname:string,
    public lastName:string,
    public mobileNumber:string,
    public username:string,
    public email:string,
    public password:string,
    public active: boolean,
    public firstLogin: boolean,
    public retryCount: number

  ) {
  }
}
