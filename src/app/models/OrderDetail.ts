import { Order } from "./Order";
import { Product } from "./Product";

export class OrderDetail{
    id!: string;
    price!: number;
    quantity!: number;
    product!:Product;
    order!: Order;
}