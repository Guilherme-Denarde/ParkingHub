import { AbstractEntity } from './AbstractEntity';

export class Settings extends AbstractEntity {
    hrValue! : number
    trafficTicketValue! : number
    startWorkHr! : Date
    endHourHr! : Date
    timeToDescount! : number
    valueDiscount! : number
    discountShift! : boolean
    carVacancy! : number
    bikeVacancy! : number
    vanVacancy! : number

    constructor() {
        super()
        this.active = true;
    }

}