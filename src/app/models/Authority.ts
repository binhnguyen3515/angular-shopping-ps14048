import { Account } from "./Account";
import { Role } from "./Role";

export class Authority{
    id!:number;
    account!:Account;
    role!:Role;
}