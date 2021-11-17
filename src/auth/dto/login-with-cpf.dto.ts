import { ApiProperty } from "@nestjs/swagger";

export class LoginWithCpfDto {
	@ApiProperty()
	cpf: string;
	@ApiProperty()
	password: string;
}
