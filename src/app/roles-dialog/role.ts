import {PermissionEnum} from "./permission-enum";
import {ERole} from "./erole";

export class Role {
  constructor(
    public id: number,
    public name: ERole,
    public permissions: PermissionEnum[]
  ){}
}
