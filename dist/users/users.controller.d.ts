import { UsersService } from "./users.service";
import { CreateUserDto, CreatedUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<CreatedUserDto>;
}
