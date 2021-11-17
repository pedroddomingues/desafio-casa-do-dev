import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUserByCPF(cpf: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByCPF(cpf);
		const isMatch = await bcrypt.compare(password, user.password);
		if (user && isMatch) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async loginWithCPF(user: any): Promise<any> {
		const payload = { cpf: user.cpf, sub: user._id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
