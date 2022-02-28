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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounts_service_1 = require("../accounts/accounts.service");
const transaction_entity_1 = require("./entities/transaction.entity");
const transaction_type_1 = require("../constants/transaction.type");
const account_entity_1 = require("../accounts/entities/account.entity");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("../auth/auth.service");
let TransactionsService = class TransactionsService {
	constructor(transactionModel, AccountsService, UsersService, AuthService) {
		this.transactionModel = transactionModel;
		this.AccountsService = AccountsService;
		this.UsersService = UsersService;
		this.AuthService = AuthService;
	}
	async deposit(createTransactionDto) {
		let account = await this.AccountsService.findOneByCPF(
			createTransactionDto.cpf
		);
		if (!account)
			throw new common_1.HttpException(
				{
					message: "Account not found",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		const { value, depositant, type } = createTransactionDto;
		const newTransactionDto = { from: account, value, depositant, type };
		const transaction = await this.transactionModel.create(
			newTransactionDto
		);
		this.pushTransaction(account, transaction);
		account.balance = this.newBalance(
			account,
			value,
			type,
			account._id.toString()
		);
		await account.save();
		return { message: "Deposit successful." };
	}
	async withdrawal(createTransactionDto, req) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		await user.populate("account");
		console.log(user);
		await this.AuthService.checkPassword(
			createTransactionDto.password,
			user
		);
		const account = await this.AccountsService.findOneByCPF(user.cpf);
		if (!account)
			throw new common_1.HttpException(
				{
					message: "Account not found",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		const { value, type } = createTransactionDto;
		const newBalance = this.newBalance(
			account,
			value,
			type,
			account._id.toString()
		);
		this.checkEnoughBalance(account, newBalance);
		const newTransactionDto = { from: account, value, type };
		const transaction = await this.transactionModel.create(
			newTransactionDto
		);
		this.pushTransaction(account, transaction);
		account.balance = newBalance;
		await account.save();
		return {
			type: transaction.type,
			value: transaction.value,
			balance: account.balance,
			overdraftLimitLeft:
				account.balance < 0
					? account.overdraftLimit + account.balance
					: account.overdraftLimit,
		};
	}
	async transfer(createTransactionDto, req) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		if (user.cpf === createTransactionDto.cpf)
			throw new common_1.HttpException(
				{
					message: "You can't send money to yourself",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		const accountTo = await this.AccountsService.findOneByCPF(
			createTransactionDto.cpf
		);
		if (!accountTo)
			throw new common_1.HttpException(
				{
					message: "Account not found",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		await accountTo.populate("user");
		await this.AuthService.checkPassword(
			createTransactionDto.password,
			user
		);
		await user.populate("account");
		const { value, type, description } = createTransactionDto;
		const newTransaction = {
			from: user.account,
			value,
			type,
			to: accountTo,
			description,
		};
		const account = await this.AccountsService.findOneByCPF(user.cpf);
		if (!account)
			throw new common_1.HttpException(
				{
					message: "Account not found",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		const newBalanceFrom = this.newBalance(
			account,
			value,
			type,
			account._id.toString()
		);
		this.checkEnoughBalance(account, newBalanceFrom);
		const transaction = await this.transactionModel.create(newTransaction);
		this.pushTransaction(account, transaction);
		account.balance = newBalanceFrom;
		await account.save();
		const newBalanceTo = this.newBalance(
			accountTo,
			value,
			type,
			account._id.toString()
		);
		this.pushTransaction(accountTo, transaction);
		accountTo.balance = newBalanceTo;
		await accountTo.save();
		return {
			message: "Transfer successful",
			to: {
				name: accountTo.user.name,
				account_id: accountTo.sequential_id,
			},
			value: transaction.value,
			balance: account.balance,
			overdraftLimitLeft:
				account.balance < 0
					? account.overdraftLimit + account.balance
					: account.overdraftLimit,
		};
	}
	async payment(createTransactionDto, req) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		await this.AuthService.checkPassword(
			createTransactionDto.password,
			user
		);
		await user.populate("account");
		const { value, type, description } = createTransactionDto;
		const account = await this.AccountsService.findOneByCPF(user.cpf);
		if (!account)
			throw new common_1.HttpException(
				{
					message: "Account not found",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
		const newBalance = this.newBalance(
			account,
			value,
			type,
			account._id.toString()
		);
		this.checkEnoughBalance(account, newBalance);
		const newTransaction = {
			from: user.account,
			value,
			type,
			description,
		};
		const transaction = await this.transactionModel.create(newTransaction);
		this.pushTransaction(account, transaction);
		account.balance = newBalance;
		await account.save();
		return {
			message: "Payment successful",
			value: transaction.value,
			balance: account.balance,
			overdraftLimitLeft:
				account.balance < 0
					? account.overdraftLimit + account.balance
					: account.overdraftLimit,
		};
	}
	async getTransactionsByDate(account, startDate, endDate) {
		const transactions = await this.transactionModel
			.find({
				$or: [{ from: account }, { to: account }],
				createdAt: {
					$gte: new Date(startDate),
					$lte: new Date(endDate),
				},
			})
			.sort({ createdAt: 1 });
		return transactions;
	}
	newBalance(account, value, type, from) {
		let newBalance = account.balance;
		switch (type) {
			case transaction_type_1.TransactionType.deposit:
				newBalance += value;
				break;
			case transaction_type_1.TransactionType.whithdrawal:
				newBalance -= value;
				break;
			case transaction_type_1.TransactionType.transfer:
				if (from === account._id.toString()) newBalance -= value;
				else newBalance += value;
				break;
			case transaction_type_1.TransactionType.payment:
				newBalance -= value;
				break;
		}
		return newBalance;
	}
	checkEnoughBalance(account, newBalance) {
		if (newBalance < 0 && Math.abs(newBalance) > account.overdraftLimit)
			throw new common_1.HttpException(
				{
					message: "Not enough funds.",
				},
				common_1.HttpStatus.BAD_REQUEST
			);
	}
	pushTransaction(account, transaction) {
		if (account.statement.length > 4) {
			account.statement.shift();
		}
		account.statement.push(transaction);
	}
};
TransactionsService = __decorate(
	[
		(0, common_1.Injectable)(),
		__param(
			0,
			(0, mongoose_1.InjectModel)(transaction_entity_1.Transaction.name)
		),
		__param(
			1,
			(0, common_1.Inject)(
				(0, common_1.forwardRef)(
					() => accounts_service_1.AccountsService
				)
			)
		),
		__param(
			2,
			(0, common_1.Inject)(
				(0, common_1.forwardRef)(() => users_service_1.UsersService)
			)
		),
		__metadata("design:paramtypes", [
			mongoose_2.Model,
			accounts_service_1.AccountsService,
			users_service_1.UsersService,
			auth_service_1.AuthService,
		]),
	],
	TransactionsService
);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map
