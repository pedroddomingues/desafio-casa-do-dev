import { Document, Schema as mongoSchema } from "mongoose";
import { Account } from "src/accounts/entities/account.entity";
import { DepositantDto } from "../dto/depositant.dto";
export declare type TransactionDocument = Transaction & Document;
export declare class Transaction {
    from: Account;
    to: Account;
    type: string;
    value: number;
    description?: string;
    depositant?: DepositantDto;
    createdAt: Date;
}
export declare const TransactionSchema: mongoSchema<Document<Transaction, any, any>, import("mongoose").Model<Document<Transaction, any, any>, any, any, any>, {}>;
