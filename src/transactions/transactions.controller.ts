import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("transactions")
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	// @Post()
	// create(@Body() createTransactionDto: CreateTransactionDto) {
	// 	return this.transactionsService.create(createTransactionDto);
	// }

	// @Get()
	// findAll() {
	// 	return this.transactionsService.findAll();
	// }

	// @Get(":id")
	// findOne(@Param("id") id: string) {
	// 	return this.transactionsService.findOne(+id);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.transactionsService.remove(+id);
	// }
}
