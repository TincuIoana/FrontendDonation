import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Table} from "primeng/table";
import {FilterService} from "primeng/api";

import {Campaign} from "../../../campaign-management/campaign";
import {Role} from "../../models/role";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users!: User[];
  loading: boolean = true;

  constructor(private userService: UserService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    });

    this.filterService.register('role-filter', (value: Role[], filter: string) => this.filterFunction(value, filter));
    this.filterService.register('campaign-filter', (value: Campaign[], filter: string) => this.filterFunction(value, filter));
  }

  clear(table: Table) {
    table.clear();
  }


  filterFunction(array: Role[] | Campaign[], filter: string): boolean {
    if (filter === undefined || filter == null || filter.length == 0) {
      return true;
    }
    if (array === undefined || array === null) {
      return false;
    }
    return array.some(value => value["name"].toLowerCase().includes(filter.toLowerCase()));
  }

  editUser(userToEdit: User) {
    this.users.forEach(user => {
      if(user.id === userToEdit.id){
        user = userToEdit;
        console.log("test")
        this.userService.getUsers().subscribe((users) => {
          this.users = users;
        });
      }
    })
  }
}
