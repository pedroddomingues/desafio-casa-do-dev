import { Request } from "express";
import { PaginationQueryDto } from "src/common/query.dto";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<import("./entities/account.entity").AccountDocument>;
    getBalance(req: Request): Promise<{
        balance: number;
        overdraftLimitLeft: number;
    }>;
    getStatement(req: Request, query: PaginationQueryDto): Promise<{}>;
}
