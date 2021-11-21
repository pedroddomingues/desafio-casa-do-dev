import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	canActivate(context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		if (!request.body.cpf || !request.body.password) {
			throw new HttpException(
				{
					message: "Please provide the credentials in the body request.",
				},
				HttpStatus.UNAUTHORIZED
			);
		}
		return super.canActivate(context);
	}
}
