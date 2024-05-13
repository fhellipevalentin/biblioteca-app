export class Authors {

    id: number | null;
    name : string | null;

    constructor(author: Partial<Authors> = {}) {
      this.id = author?.id || null;
      this.name = author?.name || '';
    }
}
