import {
	Controller,
	Post,
	Body,
	UseGuards,
	Req,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TransactionType } from "src/constants/transaction.type";
import { Request } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("transactions")
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: Request) {
		let result;
		switch (createTransactionDto.type) {
			case TransactionType.deposit:
				result = this.transactionsService.deposit(createTransactionDto);
				break;
			case TransactionType.whithdrawal:
				result =
					this.transactionsService.withdrawal(createTransactionDto, req);
				break;
			case TransactionType.transfer:
				result =
					this.transactionsService.transfer(createTransactionDto, req);
				break;
			case TransactionType.payment:
				result = this.transactionsService.payment(createTransactionDto, req);
				break;
			default:
				result = { error: "Invalid transaction type" };
		}
		return result;
	}
}
