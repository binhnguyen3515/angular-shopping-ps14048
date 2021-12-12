import { Category } from "./Category";
import { OrderDetail } from "./OrderDetail";

export class Product{
    id!:number;
    name!:string;
    image!:string;
    price!:number;
    createDate!:Date;
    available!:boolean;
    category!:Category;
    orderDetail!:OrderDetail[];
    quantity:number=0;
}