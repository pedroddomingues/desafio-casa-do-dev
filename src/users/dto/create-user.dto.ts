import { IsEmail, IsNotEmpty, IsNumber, Length, Min } from "class-validator";
import { IsCPF, IsPhone } from "brazilian-class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@IsCPF()
	cpf: string;

	@ApiProperty()
	@IsPhone()
	@Length(11, 11, {
		message:
			"Cellphone number must be 11 digits, 2 for DDD and 9 for number.",
	})
	phone: string;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	overdraftLimit: number;
}

export class CreatedUserDto {
	@ApiProperty()
	_id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	cpf: string;

	@ApiProperty()
	phone: string;

	@ApiProperty({ type: () => Account })
	account: Account;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
