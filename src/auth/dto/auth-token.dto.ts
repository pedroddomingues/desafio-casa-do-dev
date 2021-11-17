import { ApiProperty } from "@nestjs/swagger";

export class AuthTokenDto {
	@ApiProperty()
	token: string;
}
