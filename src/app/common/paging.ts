export class Paging<T>{
    content!:T[];
    totalElements!:number;
    totalPages!:number;
    size!:number;
    number!:number;
    sort={
        empty!:Boolean,
        sorted!:Boolean,
        unsorted!:Boolean,
    };
    first!:Boolean;
    numberOfElements!:number;
    empty!:Boolean;
}