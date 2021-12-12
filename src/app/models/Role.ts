import { Authority } from "./Authority";

export class Role{
    id!: string;
    name!: string;
    authorities!:Authority[];
}