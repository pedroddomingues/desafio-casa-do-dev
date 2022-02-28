"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === "object" &&
			typeof Reflect.decorate === "function"
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (
			typeof Reflect === "object" &&
			typeof Reflect.metadata === "function"
		)
			return Reflect.metadata(k, v);
	};
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex);
		};
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const accounts_service_1 = require("../accounts/accounts.service");
let UsersService = class UsersService {
	constructor(userModel, AccountsService) {
		this.userModel = userModel;
		this.AccountsService = AccountsService;
	}
	async hashPassword(password) {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}
	async create(createUserDto) {
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
			throw new common_1.HttpException(
				{
					message: "Maximum number of accounts reached",
				},
				common_1.HttpStatus.CONFLICT
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
	async findOneByCPF(cpf) {
		const user = await this.userModel.findOne({ cpf });
		return user;
	}
	async findOneByID(id) {
		const user = await this.userModel.findById(id);
		return user;
	}
};
UsersService = __decorate(
	[
		(0, common_1.Injectable)(),
		__param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
		__metadata("design:paramtypes", [
			mongoose_1.Model,
			accounts_service_1.AccountsService,
		]),
	],
	UsersService
);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
