import { AbstractEntity } from "./AbstractEntity"

export class Brand extends AbstractEntity {
    name!: string;

    constructor(name: string) {
        super();
        this.name = name;
      }
}