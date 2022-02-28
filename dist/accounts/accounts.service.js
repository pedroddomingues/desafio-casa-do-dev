"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === "object" &&
			typeof Reflect.decorate === "function"
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (
			typeof Reflect === "object" &&
			typeof Reflect.metadata === "function"
		)
			return Reflect.metadata(k, v);
	};
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex);
		};
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_entity_1 = require("./entities/account.entity");
const sequential_keys_service_1 = require("../sequential-keys/sequential-keys.service");
const users_service_1 = require("../users/users.service");
const query_dto_1 = require("../common/query.dto");
const transactions_service_1 = require("../transactions/transactions.service");
let AccountsService = class AccountsService {
	constructor(
		accountModel,
		SequentialKeysService,
		UsersService,
		TransactionsService
	) {
		this.accountModel = accountModel;
		this.SequentialKeysService = SequentialKeysService;
		this.UsersService = UsersService;
		this.TransactionsService = TransactionsService;
	}
	async create(createAccountDto) {
		const { userId, overdraftLimit } = createAccountDto;
		let sequential_id_number =
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
	async findOneByCPF(cpf) {
		const user = await this.UsersService.findOneByCPF(cpf);
		const account = await this.accountModel.findOne({ user }).exec();
		if (!account) {
			return null;
		}
		return account;
	}
	async getBalance(req) {
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
	async getStatement(req, paginationQuery) {
		const user = await (
			await this.UsersService.findOneByID(req.user.sub)
		).populate("account");
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
};
AccountsService = __decorate(
	[
		(0, common_1.Injectable)(),
		__param(0, (0, mongoose_1.InjectModel)(account_entity_1.Account.name)),
		__param(
			2,
			(0, common_1.Inject)(
				(0, common_1.forwardRef)(() => users_service_1.UsersService)
			)
		),
		__param(
			3,
			(0, common_1.Inject)(
				(0, common_1.forwardRef)(
					() => transactions_service_1.TransactionsService
				)
			)
		),
		__metadata("design:paramtypes", [
			mongoose_2.Model,
			sequential_keys_service_1.SequentialKeysService,
			users_service_1.UsersService,
			transactions_service_1.TransactionsService,
		]),
	],
	AccountsService
);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map
