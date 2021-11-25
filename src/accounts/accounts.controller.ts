import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	Query,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PaginationQueryDto } from "src/common/query.dto";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@UseGuards(JwtAuthGuard)
@Controller("accounts")
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@Post()
	create(@Body() createAccountDto: CreateAccountDto) {
		return this.accountsService.create(createAccountDto);
	}

	@ApiBearerAuth()
	@Get("/balance")
	getBalance(@Req() req: Request) {
		return this.accountsService.getBalance(req);
	}

	@ApiBearerAuth()
	@Get("/statement")
	getStatement(@Req() req: Request, @Query() query: PaginationQueryDto) {
		return this.accountsService.getStatement(req, query);
	}
}
