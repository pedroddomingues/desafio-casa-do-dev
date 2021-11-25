import { TransactionType } from "src/constants/transaction.type";
import { DepositantDto } from "./depositant.dto";
export declare class CreateTransactionDto {
    type: TransactionType;
    value: number;
    password?: string;
    cpf?: string;
    depositant?: DepositantDto;
    description?: string;
}
