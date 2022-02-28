import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: MongoError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const message = [];
		let statusCode: number;
		let error: string;
		switch (exception.code) {
			case 11000:
				const field = exception.message
					.split("dup key")[1]
					.split(":")[1]
					.split(" ")[2];
				message.push(`Duplicate record of "${field}" field.`);
				statusCode = HttpStatus.BAD_REQUEST;
				error = HttpStatus[statusCode];
		}
		response.status(statusCode).json({
			error: {
				statusCode: 400,
				message: [message],
				error,
			},
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
