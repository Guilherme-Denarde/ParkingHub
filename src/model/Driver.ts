import { AbstractEntity } from './AbstractEntity';

export class Driver extends AbstractEntity {
    cpf! : string
    name! : string
    time! : number
    phoneNum! : string 

    constructor() {
        super()
        this.active = true;
    }
}