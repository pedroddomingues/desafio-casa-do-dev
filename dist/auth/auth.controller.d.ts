import { AuthService } from "./auth.service";
import { LoginWithCpfDto } from "./dto/login-with-cpf.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginWithCPF: LoginWithCpfDto): Promise<any>;
}
