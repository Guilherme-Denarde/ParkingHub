import { AbstractEntity } from './AbstractEntity';

export class Brand extends AbstractEntity {
    name!: string;

    constructor() {
        super();
        this.register = new Date();
        this.active = true;
    }
}
