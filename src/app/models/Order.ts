import { Account } from "./Account";
import { OrderDetail } from "./OrderDetail";

export class Order{
    id!:number;
    address!:string;
    createDate!:Date;
    account!:Account;
    orderDetails!:OrderDetail[];
}