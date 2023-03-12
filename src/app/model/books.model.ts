export class Book {

    id!: number;
    title : string;
    collection : string;
    quantity : number;
    publicationDate! : Date;
    manufacturingDate! : Date;
    author: string;

    constructor ( id: number, title: string, collection: string, quantity: number, publicationDate: Date, manufacturingDate: Date, author: string) {
        this.id = id;
        this.title = title;
        this.collection = collection;
        this.quantity = quantity;
        this.publicationDate = publicationDate;
        this.manufacturingDate = manufacturingDate;
        this.author = author;
    }

    toString() {
        return `${this.author}`;
      }


}