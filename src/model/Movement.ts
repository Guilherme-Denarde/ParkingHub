import { AbstractEntity } from './AbstractEntity';
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

export class Movement extends AbstractEntity {
    vehicle!: Vehicle;
    driver!: Driver;
    entry!: Date;
    exit!: Date;
    hoursDuration!: number;
    minutesDuration!: number;
    discountTime!: Date;
    penaltyTime!: Date;
    totalValue!: number;
    discountValue!: number;
    penaltyValue!: number;
    hourlyRate!: number;
    penaltyMinuteRate!: number;

    constructor() {
        super();
        this.active = true;
    }
}
