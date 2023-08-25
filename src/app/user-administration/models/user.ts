
import {Campaign} from "../../campaign-management/campaign";
import {Role} from "./role";

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
