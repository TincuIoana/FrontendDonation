import {Role} from "../../roles-dialog/role";
import {Campaign} from "../../campaign-management/campaign";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  username?: string;
  email?: string;
  roles?: Role[];
  campaigns?: Campaign[];
  password?: string;
  active?: boolean;
  firstLogin?: boolean;
  retryCount?: number;
}
