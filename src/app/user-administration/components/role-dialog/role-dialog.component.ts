import {Component, Input, OnInit} from '@angular/core';
import {Role} from "../../../roles-dialog/role";

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit{

  @Input() roles!: Role[]

  showDialog!: boolean;

  ngOnInit() {

  }
  showRoles() {
    this.showDialog = true;
  }

}
