import { Document, Schema as mongoSchema } from "mongoose";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "../../users/entities/user.entity";
export declare type AccountDocument = Account & Document;
export declare class Account {
    sequential_id: string;
    user: User;
    balance: number;
    statement: Transaction[];
    overdraftLimit: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AccountSchema: mongoSchema<Document<Account, any, any>, import("mongoose").Model<Document<Account, any, any>, any, any, any>, {}>;
