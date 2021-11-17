import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { ApiBasicAuth, ApiOkResponse } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { LoginWithCpfDto } from "./dto/login-with-cpf.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@UseGuards(LocalAuthGuard)
	@Post("login")
	@ApiOkResponse({
		type: AuthTokenDto,
	})
	async login(@Body() loginWithCPF: LoginWithCpfDto) {
		return this.authService.loginWithCPF(loginWithCPF);
	}
}

