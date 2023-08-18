import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit{
  users!: User[];

  // representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  // show(id: number) {
  //   this.userService.loadUserById(id).subscribe(user => {
  //
  //   })
  // }
}
