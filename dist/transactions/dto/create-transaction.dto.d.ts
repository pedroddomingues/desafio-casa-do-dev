import { TransactionType } from "src/constants/transaction.type";
export declare class CreateTransactionDto {
    type: TransactionType;
    value: number;
    password?: string;
    cpf?: string;
    name?: string;
    description?: string;
}
