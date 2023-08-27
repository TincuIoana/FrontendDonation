// @ts-nocheck
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RolesDialogService} from "./roles-dialog.service";
import {Role} from "./role";
import {RolesDialogPermissionsService} from "./roles-dialog-permissions.service";
import {PermissionEnum} from "./permission-enum";
import {Observable, tap} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {MessageService} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  permissions!: PermissionEnum[];
  p1!: PermissionEnum[];
  p2!: PermissionEnum[];
  p3!: PermissionEnum[];
  p4!: PermissionEnum[];
  loggedUserId = this.loginService.getLoggedUserId();
  //userId1 = parseInt(this.user1String,10);
  userId1: number = 2;    // userul are permisiunea de a edita
  userId2: number = 1;  // nu are permisiunea sa modifice rolurile
  //userId = sessionStorage.getItem("id");
  //error! : string;

  summary2!: string;  // save the translation key for successful insertion to permissionList
  summary3!: string;  // save the translation key for successful deletion to permissionList
  confirmDialog! : string; // translate confirm dialog
  permissionerror! : string;

  permissionEnumValues = Object.values(PermissionEnum).filter(value => isNaN(Number(value)));
  @Output() editPermissions = new EventEmitter<Role>();
  @Output() editRole = new EventEmitter<Role>();
  roles!: Role[];
  selectedPermission1!: PermissionEnum;
  selectedPermission2!: PermissionEnum;
  selectedPermission3!: PermissionEnum;
  selectedPermission4!: PermissionEnum;

  constructor(private fb: FormBuilder,
              private rolesDialogService: RolesDialogService,
              private rolesDialogPermissionsService: RolesDialogPermissionsService,
              private messageService: MessageService,
              private translate: TranslateService,
              private loginService: LoginService
              ) {
  }

  ngOnInit(): void {
    this.rolesDialogService.loadRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        roles.forEach(role => {
          this.rolesDialogPermissionsService.loadPermissionsOfARole(role.id).subscribe({
            next: (permissions) => {
              switch (role.id) {
                case 1:
                  this.p1 = permissions.sort();
                  break;
                case 2:
                  this.p2 = permissions.sort();
                  break;
                case 3:
                  this.p3 = permissions.sort();
                  break;
                case 4:
                  this.p4 = permissions.sort();
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
        this.permissions = permissions.sort();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getAllPermissions(): Observable<PermissionEnum[]> {
    return this.rolesDialogPermissionsService.getAllPermissions();
  }


  addPermissionToRole(userId: number, roleId: number, permission: PermissionEnum,summary:string) {
    return this.rolesDialogPermissionsService.addPermissionToRole(userId, roleId, permission)
      .pipe(tap(
        (error) => {
          if(error["type"]){
          console.log(error);
          this.translate.stream([
            // translate the exception/error messages from service
            "PERMISSIONS.Permission_to_add_cannot_be_null.",
            "PERMISSIONS.Permission_already_exists.",
            "PERMISSIONS.User_not_found_or_permission_not_available_to_edit_roles.",
          ]).subscribe(translations => {
            console.log(error.type)
            this.permissionerror = translations["PERMISSIONS."+error.type]
            console.log(translations[error.type])
          });
          this.showError(this.permissionerror,summary);}
          else this.showSuccessAdd();
        }
      ))
      .subscribe({
      next: (role) => {
      switch (role.id) {
        case 1:
          this.p1 = role.permissions;
          break;
        case 2:
          this.p2 = role.permissions;
          break;
        case 3:
          this.p3 = role.permissions;
          break;
        case 4:
          this.p4 = role.permissions;
          break;
      }
      }
    });
  }

  deletePermissionFromRole(userId: number, roleId: number, permission: PermissionEnum,summary:string) {
    return this.rolesDialogPermissionsService.deletePermissionFromRole(userId, roleId, permission)
      .pipe(tap(
        (error) => {
          if(error["type"]){
            console.log(error);
            this.translate.stream([
              // translate the exception/error messages from service
              "PERMISSIONS.User_not_found_or_permission_not_available_to_edit_roles.",
              "PERMISSIONS.Permission_to_delete_cannot_be_null.",
              "PERMISSIONS.Permission_to_delete_does_not_exist.",
            ]).subscribe(translations => {
              console.log(error.type)
              this.permissionerror = translations["PERMISSIONS."+error.type]
              console.log(translations[error.type])
            });
            this.showError(this.permissionerror,summary);}
          else this.showSuccessDelete();
        }
      ))
      .subscribe({
      next: (role) => {
        switch (role.id) {
          case 1:
            this.p1 = role.permissions;
            break;
          case 2:
            this.p2 = role.permissions;
            break;
          case 3:
            this.p3 = role.permissions;
            break;
          case 4:
            this.p4 = role.permissions;
            break;
        }
      }
    });
  }

  protected readonly PermissionEnum = PermissionEnum;
  protected readonly JSON = JSON;

  showError(error:any, summary:string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: error });
    console.log(error);
  }

  showSuccessAdd(){
    // for p-toast ---- translated message by successful insertion
    this.translate.stream([
      "PERMISSIONS.Added_successfully"
    ]).subscribe(translations => {
      this.summary2 = translations["PERMISSIONS.Added_successfully"];
    });
    this.messageService.add({ severity: 'success', detail: this.summary2})
  }

  showSuccessDelete(){
    // for p-toast ---- translated message by successful deletion
    this.translate.stream([
      "PERMISSIONS.Deleted_successfully"
    ]).subscribe(translations => {
      this.summary3 = translations["PERMISSIONS.Deleted_successfully"];
    });
    this.messageService.add({ severity: 'success', detail: this.summary3})
  }
}
