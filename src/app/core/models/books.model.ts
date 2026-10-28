import { Authors } from "./author.model";

export class Book {

    id: number | null;
    title : string;
    collection : string;
    quantity : number | null;
    publicationDate : Date | string;
    manufacturingDate : Date | string;
    authors: Authors[];
    genre1: string;
    genre2: string;
    genre3: string;

    constructor(book: Partial<Book> = {}) {
      this.id = book?.id || null;
      this.title = book?.title || '';
      this.collection = book?.collection || '';
      this.quantity = book?.quantity || null;
      this.publicationDate = book?.publicationDate || null;
      this.manufacturingDate = book?.manufacturingDate || null;
      this.authors = book?.authors || [];
      this.genre1 = book?.genre1 || '';
      this.genre2 = book?.genre2 || '';
      this.genre3 = book?.genre3 || '';
    }

}
