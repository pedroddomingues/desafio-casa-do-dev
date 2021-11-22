import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByCPF(cpf: string, password: string): Promise<any>;
    loginWithCPF(user: UserDocument): Promise<any>;
    checkPassword(password: string, user: User): Promise<boolean>;
}
