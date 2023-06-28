import { AbstractEntity } from './AbstractEntity';
import {  Brand } from "./Brand";


export class Model extends AbstractEntity {
    name! : string
    brand! : Brand

    constructor() {
        super()
        this.active = true;
    }

}