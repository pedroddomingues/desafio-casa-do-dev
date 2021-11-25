import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsCPF } from "brazilian-class-validator";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { TransactionType } from "src/constants/transaction.type";
import { DepositantDto } from "./depositant.dto";

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
	@ValidateNested()
	@Type(() => DepositantDto)
	@ApiPropertyOptional({ type: () => DepositantDto})
	depositant?: DepositantDto;

	@ValidateIf((o) => o.type === TransactionType.payment)
	@IsString()
	@ApiPropertyOptional()
	description?: string;
}
