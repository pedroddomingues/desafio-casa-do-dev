import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";

import { CreatedUserDto, CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import { AccountsService } from "src/accounts/accounts.service";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly AccountsService: AccountsService
	) {}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> | null {
		createUserDto.password = await this.hashPassword(
			createUserDto.password
		);
		const user = await this.userModel.create(createUserDto);
		const account = await this.AccountsService.create({
			userId: user._id,
			overdraftLimit: createUserDto.overdraftLimit,
		});
		if (account == null) {
			await user.remove();
			throw new HttpException(
				{
					message: "Maximum number of accounts reached",
				},
				HttpStatus.CONFLICT
			);
		}
		user.account = account;
		await user.save();
		return this.userModel
			.findById(user._id)
			.populate("account", { user: 0, _id: 0 })
			.select({ password: 0 })
			.exec();
	}

	findAll() {
		return `This action returns all users`;
	}

	async findOneByCPF(
		cpf: string
	): Promise<(User & UserDocument & { _id: any })> {
		const user = await this.userModel.findOne({ cpf: cpf });
		return user;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
