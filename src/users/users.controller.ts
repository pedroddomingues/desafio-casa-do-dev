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

	@Get()
	findOne(@Headers("cpf") cpf: string) {
		return this.usersService.findOneByCPF(cpf);
	}

	// @Patch(":id")
	// update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.usersService.update(+id, updateUserDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.usersService.remove(+id);
	// }
}
