import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "express";

import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account, AccountDocument } from "./entities/account.entity";
import { SequentialKeysService } from "src/sequential-keys/sequential-keys.service";
import { UsersService } from "src/users/users.service";
import { PaginationQueryDto } from "src/common/query.dto";
import { TransactionsService } from "src/transactions/transactions.service";

@Injectable()
export class AccountsService {
	constructor(
		@InjectModel(Account.name) private accountModel: Model<AccountDocument>,
		private readonly SequentialKeysService: SequentialKeysService,
		@Inject(forwardRef(() => UsersService))
		private readonly UsersService: UsersService,
		@Inject(forwardRef(() => TransactionsService))
		private readonly TransactionsService: TransactionsService
	) {}

	async create(
		createAccountDto: CreateAccountDto
	): Promise<AccountDocument> | null {
		const { userId, overdraftLimit } = createAccountDto;
		const sequential_id_number =
			await this.SequentialKeysService.getSequentialKey("account");
		if (sequential_id_number === 0) {
			return null;
		}
		const sequential_id =
			this.SequentialKeysService.sequentialKeyToZerosString(
				sequential_id_number,
				6
			);
		const account = await this.accountModel.create({
			user: userId,
			overdraftLimit,
			sequential_id,
		});
		return account;
	}

	async findOneByCPF(cpf: string): Promise<AccountDocument> | null {
		const user = await this.UsersService.findOneByCPF(cpf);
		const account = await this.accountModel.findOne({ user }).exec();
		if (!account) {
			return null;
		}
		return account;
	}

	async getBalance(req: Request & { user?: any }) {
		const user = await (
			await this.UsersService.findOneByID(req.user.sub)
		).populate("account");
		return {
			balance: user.account.balance,
			overdraftLimitLeft:
				user.account.balance < 0
					? user.account.overdraftLimit + user.account.balance
					: user.account.overdraftLimit,
		};
	}

	async getStatement(
		req: Request & { user?: any },
		paginationQuery: PaginationQueryDto
	) {
		const user = await (
			await this.UsersService.findOneByID(req.user.sub)
		).populate("account");
		// if start and end dates were not provided, get account's last statement
		// if (!paginationQuery.startDate) {
		// 	await user.populate("account.statement");
		// 	return user.account.statement;
		// }
		const { startDate, endDate } = paginationQuery;
		const transactions =
			await this.TransactionsService.getTransactionsByDate(
				user.account,
				startDate,
				endDate
			);
		const groupedTransactions = {};
		transactions.forEach((transaction) => {
			const dateString = transaction.createdAt
				.toISOString()
				.split("T")[0];
			if (groupedTransactions[dateString]) {
				groupedTransactions[dateString].push(transaction);
			} else {
				groupedTransactions[dateString] = [transaction];
			}
		});
		return groupedTransactions;
	}
}
