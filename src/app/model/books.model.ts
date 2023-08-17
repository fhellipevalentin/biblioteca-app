import { Authors } from "./author.model";
import { Genre } from "./genres.model";

export interface Book {

    id: string;
    title : string;
    collection : string;
    quantity : string;
    publicationDate : string;
    manufacturingDate : string;
    authors: Authors[];
    genres: Genre[];

}
