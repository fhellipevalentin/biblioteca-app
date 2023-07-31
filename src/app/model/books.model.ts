import { Author } from "./author.model";
import { Genre } from "./genres.model";

export interface Book {

    id: number;
    title : string;
    collection : string;
    quantity : number;
    publicationDate : Date;
    manufacturingDate : Date;
    author: Author[];
    genres: Genre[];

}
