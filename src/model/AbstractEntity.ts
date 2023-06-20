export abstract class AbstractEntity {
    id!: number;
    cadastro: Date = new Date();
    atualizado!: Date;
    ativo!: boolean;
}
