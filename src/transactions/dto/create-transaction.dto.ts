import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Min, ValidateIf } from "class-validator";
import { TransactionType } from "src/constants/transaction.type";

export class CreateTransactionDto {
	@IsNotEmpty()
	@IsEnum(TransactionType)
	@ApiProperty({ enum: TransactionType })
	type: TransactionType;

	@IsNotEmpty()
	@Min(0.01)
	@ApiProperty()
	value: number;

	@ValidateIf((o) => o.type !== TransactionType.deposit)
	@IsString()
	@ApiPropertyOptional()
	password?: string;

	@ValidateIf((o) => o.type === TransactionType.deposit || o.type === TransactionType.transfer)
	@IsString()
	@ApiPropertyOptional()
	cpf?: string;

	@ValidateIf((o) => o.type === TransactionType.deposit)
	@IsString()
	@ApiPropertyOptional()
	name?: string;

	@ValidateIf((o) => o.type === TransactionType.payment)
	@IsString()
	@ApiPropertyOptional()
	description?: string;
}
