import { Account } from "src/accounts/entities/account.entity";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    overdraftLimit: number;
}
export declare class CreatedUserDto {
    _id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    account: Account;
    createdAt: Date;
    updatedAt: Date;
}
