// @ts-nocheck
import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";
import {Role} from "../../../roles-dialog/role";
import {Campaign} from "../../../campaign-management/campaign";
import {CampaignService} from "../../../campaign-management/campaign.service";
import {RolesDialogService} from "../../../roles-dialog/roles-dialog.service";


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit{
  @Input() userFromDB!: User;
  showDialog!: boolean;
  submitted!: boolean;
  allRoles!: Role[];
  user!: User
  allCampaigns!: Campaign[];
  errorMessage!: string
  @Input() registerForm = this.fb.group( {
    firstName : [''],
    lastName : [''],
    email : ['', Validators.pattern("^$|[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")],
    password:['', Validators.pattern("^$|.{6,32}$")],
    mobileNumber : ['', Validators.pattern('^$|(?:(?:\\+?40)|0)?7\\d{8}$')],
    roles : [[]],
    campaigns: [[]],
    active: [false]
  })


  constructor(
    private campaignService: CampaignService,
    private roleService: RolesDialogService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
  }
  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.allCampaigns = campaigns;
    });
    this.roleService.getRoles().subscribe(roles => {
      this.allRoles = roles;
    });
  }

  openEdit() {
    this.user = {}
    this.submitted = false;
    this.showDialog = true;
    // @ts-ignore
    this.registerForm.get("active").setValue(this.userFromDB.active)
  }


  updateUser() {
    this.submitted = true;
    this.user.id = this.userFromDB.id;
    if(this.registerForm.value.firstName !== "")
      this.user.firstName = this.registerForm.value.firstName;
    if(this.registerForm.value.lastName !== "")
      this.user.lastName = this.registerForm.value.lastName;
    if(this.registerForm.value.email !== "")
      this.user.email = this.registerForm.value.email;
    if(this.registerForm.value.mobileNumber !== "")
      this.user.mobileNumber = this.registerForm.value.mobileNumber;
    if(this.registerForm.controls.roles.value !== [])
      this.user.roles = this.registerForm.controls.roles.value;
    if(this.registerForm.controls.campaigns.value !== [])
      this.user.campaigns = this.registerForm.controls.campaigns.value;
    if(this.registerForm.value.firstName !== "")
      this.user.password = this.registerForm.value.password;
    this.user.active = this.registerForm.value.active;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'User updated', life: 3000});
    this.userService.updateUser(this.user)
      .subscribe(() => this.userService.getUsers());
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    // setTimeout();
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }
}
