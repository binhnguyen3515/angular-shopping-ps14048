import { Order } from "./Order";

export class Account{
    username!: string;
    password!: string;
    fullname!: string;
    email!: string;
    photo!:string;
    orders!:Order[];
}