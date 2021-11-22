import { Model } from "mongoose";
import { Request } from "express";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountDocument } from "./entities/account.entity";
import { SequentialKeysService } from "src/sequential-keys/sequential-keys.service";
import { UsersService } from "src/users/users.service";
import { PaginationQueryDto } from "src/common/query.dto";
import { TransactionsService } from "src/transactions/transactions.service";
export declare class AccountsService {
    private accountModel;
    private readonly SequentialKeysService;
    private readonly UsersService;
    private readonly TransactionsService;
    constructor(accountModel: Model<AccountDocument>, SequentialKeysService: SequentialKeysService, UsersService: UsersService, TransactionsService: TransactionsService);
    create(createAccountDto: CreateAccountDto): Promise<AccountDocument> | null;
    findOneByCPF(cpf: string): Promise<AccountDocument> | null;
    getBalance(req: Request & {
        user?: any;
    }): Promise<{
        balance: number;
        overdraftLimitLeft: number;
    }>;
    getStatement(req: Request & {
        user?: any;
    }, paginationQuery: PaginationQueryDto): Promise<{}>;
}
