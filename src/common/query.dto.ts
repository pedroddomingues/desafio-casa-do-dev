import { IsDateString, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { IsAfterDate, IsBeforeDate } from "class-validator-date"

export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	limit: number;

	@IsOptional()
	@IsPositive()
	offset: number;

	// @IsOptional()
	@IsDateString()
	startDate: string;
	
	// @IsOptional()
	@IsDateString()
	@IsAfterDate("startDate")
	@IsBeforeDate("now")
	endDate: string;
}
