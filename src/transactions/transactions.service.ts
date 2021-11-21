import {
	HttpException,
	HttpStatus,
	Injectable,
	forwardRef,
	Inject,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { AccountsService } from "src/accounts/accounts.service";
import {
	Transaction,
	TransactionDocument,
} from "./entities/transaction.entity";
import { TransactionType } from "src/constants/transaction.type";
import { Account, AccountDocument } from "src/accounts/entities/account.entity";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class TransactionsService {
	constructor(
		@InjectModel(Transaction.name)
		private transactionModel: Model<TransactionDocument>,
		@Inject(forwardRef(() => AccountsService))
		private readonly AccountsService: AccountsService,
		@Inject(forwardRef(() => UsersService))
		private readonly UsersService: UsersService,
		private readonly AuthService: AuthService
	) {}

	async deposit(createTransactionDto: CreateTransactionDto) {
		let account = await this.AccountsService.findOneByCPF(
			createTransactionDto.cpf
		);
		if (!account)
			throw new HttpException(
				{
					message: "Account not found",
				},
				HttpStatus.BAD_REQUEST
			);
		const { value, name, type } = createTransactionDto;
		const newTransactionDto = { from: account, value, name, type };
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

	async withdrawal(
		createTransactionDto: CreateTransactionDto,
		req: Request & { user?: any }
	) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		await user.populate("account");
		console.log(user);
		await this.AuthService.checkPassword(
			createTransactionDto.password,
			user
		);
		const account = await this.AccountsService.findOneByCPF(user.cpf);
		if (!account)
			throw new HttpException(
				{
					message: "Account not found",
				},
				HttpStatus.BAD_REQUEST
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

	async transfer(
		createTransactionDto: CreateTransactionDto,
		req: Request & { user?: any }
	) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		if (user.cpf === createTransactionDto.cpf)
			throw new HttpException(
				{
					message: "You can't send money to yourself",
				},
				HttpStatus.BAD_REQUEST
			);
		const accountTo = await this.AccountsService.findOneByCPF(
			createTransactionDto.cpf
		);
		if (!accountTo)
			throw new HttpException(
				{
					message: "Account not found",
				},
				HttpStatus.BAD_REQUEST
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
			throw new HttpException(
				{
					message: "Account not found",
				},
				HttpStatus.BAD_REQUEST
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

	async payment(
		createTransactionDto: CreateTransactionDto,
		req: Request & { user?: any }
	) {
		const user = await this.UsersService.findOneByID(req.user.sub);
		await this.AuthService.checkPassword(
			createTransactionDto.password,
			user
		);
		await user.populate("account");
		const { value, type, description } = createTransactionDto;
		const account = await this.AccountsService.findOneByCPF(user.cpf);
		if (!account)
			throw new HttpException(
				{
					message: "Account not found",
				},
				HttpStatus.BAD_REQUEST
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

	async getTransactionsByDate(
		account: Account,
		startDate: string,
		endDate: string
	) {
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

	newBalance(
		account: AccountDocument,
		value: number,
		type: TransactionType,
		from: String
	) {
		let newBalance = account.balance;
		switch (type) {
			case TransactionType.deposit:
				newBalance += value;
				break;
			case TransactionType.whithdrawal:
				newBalance -= value;
				break;
			case TransactionType.transfer:
				if (from === account._id.toString()) newBalance -= value;
				else newBalance += value;
				break;
			case TransactionType.payment:
				newBalance -= value;
				break;
		}
		return newBalance;
	}

	checkEnoughBalance(account: AccountDocument, newBalance: number) {
		if (newBalance < 0 && Math.abs(newBalance) > account.overdraftLimit)
			throw new HttpException(
				{
					message: "Not enough funds.",
				},
				HttpStatus.BAD_REQUEST
			);
	}

	pushTransaction(account: AccountDocument, transaction: Transaction) {
		if (account.statement.length > 4) {
			account.statement.shift();
		}
		account.statement.push(transaction);
	}
}
