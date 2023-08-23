import {Campaign} from "../campaign-management/campaign";
import {Role} from "../roles-dialog/role";
import {PermissionEnum} from "../roles-dialog/permission-enum";

export class LoginResponse {
  public accessToken?: string

  constructor(
    public id: number,
    public firstLogin:boolean,

    public firstName?: string,
    public lastName?: string,
    public mobileNumber?: string,
    public username?: string,
    public email?:string,
    public password?: string,
    public active?: boolean,
    public retryCount?: number,
    public roles?:Role[],
    public permission?:PermissionEnum,
    public campaigns?: Campaign[],
    //
    // public roles:string[]


  ) {
  }
}
