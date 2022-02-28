import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "src/users/entities/user.entity";

import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async validateUserByCPF(cpf: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByCPF(cpf);
		if (!user) {
			throw new HttpException(
				{
					message: "User not found.",
				},
				HttpStatus.BAD_REQUEST
			);
		}
		if (await this.checkPassword(password, user)) {
			user.password = undefined;
			return user;
		}
		throw new HttpException(
			{
				message: "Wrong password.",
			},
			HttpStatus.UNAUTHORIZED
		);
	}

	async loginWithCPF(user: UserDocument): Promise<any> {
		const payload = { sub: user._id, accountId: user.account };
		return {
			access_token: this.jwtService.sign(payload, {
				secret: `${process.env.JWT_SECRET}`,
			}),
		};
	}

	async checkPassword(password: string, user: User): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new HttpException(
				{
					message: "Invalid credentials.",
				},
				HttpStatus.UNAUTHORIZED
			);
		}
		return isMatch;
	}
}
