import { ApiProperty } from "@nestjs/swagger";
import { IsCPF } from "brazilian-class-validator";
import { IsNotEmpty } from "class-validator";

export class DepositantDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@IsCPF()
	@ApiProperty()
	cpf: string;
}
