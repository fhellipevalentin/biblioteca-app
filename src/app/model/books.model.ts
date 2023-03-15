import { Author } from "./author.model";

export interface Book {

    id: number;
    title : string;
    collection : any;
    quantity : number;
    publicationDate : Date;
    manufacturingDate : Date;
    author: Author;


}