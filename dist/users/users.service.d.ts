import { Model } from "mongoose";
import { CreatedUserDto, CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import { AccountsService } from "src/accounts/accounts.service";
export declare class UsersService {
    private userModel;
    private readonly AccountsService;
    constructor(userModel: Model<UserDocument>, AccountsService: AccountsService);
    hashPassword(password: string): Promise<string>;
    create(createUserDto: CreateUserDto): Promise<CreatedUserDto> | null;
    findOneByCPF(cpf: string): Promise<(User & UserDocument & {
        _id: any;
    })>;
    findOneByID(id: string): Promise<(User & UserDocument & {
        _id: any;
    })>;
}
