import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {RolesDialogService} from "./roles-dialog.service";
import {Role} from "./role";
import {RolesDialogPermissionsService} from "./roles-dialog-permissions.service";
import {PermissionEnum} from "./permission-enum";
import {forkJoin, mergeMap, Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit{
  // Convert PermissionEnum values to an array of strings
  permissions!: PermissionEnum[];
  p1!: PermissionEnum[];
  p2!: PermissionEnum[];
  p3!: PermissionEnum[];
  p4!: PermissionEnum[];

  permissionEnumValues = Object.values(PermissionEnum).filter(value => isNaN(Number(value)));
  @Output() editPermissions = new EventEmitter<Role>();
  @Output() editRole = new EventEmitter<Role>();
  roles!: Role[];
  selectedPermission1!: PermissionEnum;
  selectedPermission2!: PermissionEnum;
  selectedPermission3!: PermissionEnum;
  selectedPermission4!: PermissionEnum;
  constructor(     private fb: FormBuilder,
                   private rolesDialogService: RolesDialogService,
               private rolesDialogPermissionsService:RolesDialogPermissionsService) { }

  ngOnInit(): void {
    this.rolesDialogService.loadRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        roles.forEach(role => {
          this.rolesDialogPermissionsService.loadPermissionsOfARole(role.id).subscribe({
            next: (permissions) => {
              switch (role.id) {
                case 1:
                  this.p1 = permissions;
                  break;
                case 2:
                  this.p2 = permissions;
                  break;
                case 3:
                  this.p3 = permissions;
                  break;
                case 4:
                  this.p4 = permissions;
                  break;
              }
            }
          })
        })
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.rolesDialogPermissionsService.loadPermissions().subscribe({
      next: (permissions) => {
        this.permissions = permissions;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getAllPermissions(): Observable<PermissionEnum[]>{
    return this.rolesDialogPermissionsService.getAllPermissions();
  }


  addPermissionToRole(userId: number,role:Role,permission:PermissionEnum):Observable<PermissionEnum> {
    return this.rolesDialogPermissionsService.addPermissionToRole(userId,role,permission);
  }

  deletePermissionFromRole(userId: number,role:Role,permission:PermissionEnum):Observable<PermissionEnum>{
    return this.rolesDialogPermissionsService.deletePermissionFromRole(userId,role,permission);
  }
}
