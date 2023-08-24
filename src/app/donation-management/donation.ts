import {User} from "../user-administration/models/user";
import {Campaign} from "../campaign-management/campaign";
import {Donor} from "../donor-management/Donor";

export class Donation {
  public id!: number;

  constructor(
    public amount: number,
    public createdDate: Date,
    public currency: String,
    public campaign: Campaign,
    public createdBy: User,
    public donor: Donor,
    public approveDate?: Date | null,
    public approved?: boolean | null,
    public notes?: String | null,
    public approvedBy?: User | null,
  ) {
  }
}
