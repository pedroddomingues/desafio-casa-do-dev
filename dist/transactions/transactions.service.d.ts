import { Model } from "mongoose";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { AccountsService } from "src/accounts/accounts.service";
import { Transaction, TransactionDocument } from "./entities/transaction.entity";
import { TransactionType } from "src/constants/transaction.type";
import { Account, AccountDocument } from "src/accounts/entities/account.entity";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
import { AuthService } from "src/auth/auth.service";
export declare class TransactionsService {
    private transactionModel;
    private readonly AccountsService;
    private readonly UsersService;
    private readonly AuthService;
    constructor(transactionModel: Model<TransactionDocument>, AccountsService: AccountsService, UsersService: UsersService, AuthService: AuthService);
    deposit(createTransactionDto: CreateTransactionDto): Promise<{
        message: string;
    }>;
    withdrawal(createTransactionDto: CreateTransactionDto, req: Request & {
        user?: any;
    }): Promise<{
        type: string;
        value: number;
        balance: number;
        overdraftLimitLeft: number;
    }>;
    transfer(createTransactionDto: CreateTransactionDto, req: Request & {
        user?: any;
    }): Promise<{
        message: string;
        to: {
            name: string;
            account_id: string;
        };
        value: number;
        balance: number;
        overdraftLimitLeft: number;
    }>;
    payment(createTransactionDto: CreateTransactionDto, req: Request & {
        user?: any;
    }): Promise<{
        message: string;
        value: number;
        balance: number;
        overdraftLimitLeft: number;
    }>;
    getTransactionsByDate(account: Account, startDate: string, endDate: string): Promise<(Transaction & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    newBalance(account: AccountDocument, value: number, type: TransactionType, from: String): number;
    checkEnoughBalance(account: AccountDocument, newBalance: number): void;
    pushTransaction(account: AccountDocument, transaction: Transaction): void;
}
