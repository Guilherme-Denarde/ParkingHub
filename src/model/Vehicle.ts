import { AbstractEntity } from './AbstractEntity';
import { Color } from "./Color";
import { Model } from "./Model";
import { Type } from "./Type";

export class Vehicle extends AbstractEntity { 
    plate!: string
    color!: Color
    model!: Model
    type!: Type
    year!: number

    constructor() {
        super()
        this.active = true;
    }

}