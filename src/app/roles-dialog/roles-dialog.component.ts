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
  permissionsOfARole!: PermissionEnum[];
  @Output() editPermissions = new EventEmitter<Role>();
  @Output() editRole = new EventEmitter<Role>();
  roles!: Role[];
  // Define a map to store permissions for each role
  rolePermissionsMap: { [roleId: number]: PermissionEnum[] } = {};
  formGroupsMap: { [roleId: number]: FormGroup } = {};
  constructor(     private fb: FormBuilder,
                   private rolesDialogService: RolesDialogService,
               private rolesDialogPermissionsService:RolesDialogPermissionsService) { }

  ngOnInit(): void {
    this.rolesDialogService.loadRoles().subscribe({
      next: (roles) => {
        this.roles = roles;

        // Create form groups for each role and fetch role-specific permissions
        roles.forEach(role => {
          const formGroup = this.fb.group({
            selectedPermission: null // Initialize with selected permission for each role
          });
          this.formGroupsMap[role.id] = formGroup;

          // Fetch permissions for each role and populate rolePermissionsMap
          this.getAllPermissionsOfARole(role.id).subscribe({
            next: (permissions) => {
              this.rolePermissionsMap[role.id] = permissions;

              // Set options for the role's permission selection
              this.formGroupsMap[role.id].controls['selectedPermission'].setValue(permissions[0]);
            },
            error: (error) => {
              console.error(error);
            }
          });
        });
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


  getAllPermissionsOfARole(roleId: number):Observable<PermissionEnum[]>{
    return this.rolesDialogPermissionsService.getAllPermissionsOfARole(roleId);
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

  getPermissionsOfRole(role: Role): PermissionEnum[] {
    const rolePermissions = this.rolePermissionsMap[role.id];
    return rolePermissions || [];
  }

  // Method to get the form group for a specific role
  getFormGroupForRole(roleId: number): FormGroup {
    return this.formGroupsMap[roleId];
  }

}
