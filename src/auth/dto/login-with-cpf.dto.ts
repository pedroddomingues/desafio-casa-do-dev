import { ApiProperty } from "@nestjs/swagger";
import { IsCPF } from "brazilian-class-validator";
import { IsString } from "class-validator";

export class LoginWithCpfDto {
	@IsCPF()
	@ApiProperty()
	cpf: string;

	@IsString()
	@ApiProperty()
	password: string;
}
