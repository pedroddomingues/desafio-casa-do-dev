import { Document, Schema as mongoSchema } from "mongoose";
import { Account } from "../../accounts/entities/account.entity";
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    account: Account;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: mongoSchema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
