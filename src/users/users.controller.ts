import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseFilters,
	Header,
	Headers,
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto, CreatedUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HttpExceptionFilter } from "../exceptions/http-exception.filter";

@UseFilters(HttpExceptionFilter)
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({
		type: CreatedUserDto,
	})
	create(@Body() createUserDto: CreateUserDto) {
		const createdUser = this.usersService.create(createUserDto);
		return createdUser;
	}
}
