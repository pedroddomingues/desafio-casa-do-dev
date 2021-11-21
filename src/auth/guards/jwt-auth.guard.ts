import {
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { TransactionType } from "src/constants/transaction.type";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly jwtService: JwtService) {
		super();
	}
	canActivate(context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		if (request.path === "/transactions") {
			if (!request.body.type) {
				throw new HttpException(
					{
						message:
							"Make sure you have provided the type of transaction in request body.",
					},
					HttpStatus.BAD_REQUEST
				);
			} else if (request.body.type === TransactionType.deposit) {
				return true;
			}
		}
		return super.canActivate(context);
	}
}
