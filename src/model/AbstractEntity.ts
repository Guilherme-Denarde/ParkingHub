export abstract class AbstractEntity {
    id!: number;
    register: Date = new Date();
    update!: Date;
    active!: boolean;
}
