import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "cpf", passwordField: "password" });
	}

	async validate(cpf: string, password: string): Promise<any> {
		const user = await this.authService.validateUserByCPF(cpf, password);
		if (!user) {
			throw new HttpException(
				{
					message: "Login failed. Make sure the credentials are correct.",
				},
				HttpStatus.UNAUTHORIZED
			);
		}
		return user;
	}
}
