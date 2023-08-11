export class SigninRequest {
  constructor(
    public firstName: string | null | undefined,
    public lastName: string | null | undefined,
    public mobileNumber: string | null | undefined,
    public email: string | null | undefined,

    ) {
  }
}
