import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account, AccountDocument } from "./entities/account.entity";
import { SequentialKeysService } from "src/sequential-keys/sequential-keys.service";

@Injectable()
export class AccountsService {
	constructor(
		@InjectModel(Account.name) private accountModel: Model<AccountDocument>,
		private readonly SequentialKeysService: SequentialKeysService
	) {}

	async create(createAccountDto: CreateAccountDto): Promise<AccountDocument> | null {
		const { userId, overdraftLimit } = createAccountDto;
		let sequential_id_number =
			await this.SequentialKeysService.getSequentialKey("account");
		if (sequential_id_number === 0) {
			return null;
		}
		const sequential_id = ("00000" + sequential_id_number.toString()).slice(
			-6
		);
		const account = await this.accountModel.create({
			user: userId,
			overdraftLimit,
			sequential_id,
		});
		return account;
	}

	findAll() {
		return `This action returns all accounts`;
	}

	findOne(id: number) {
		return `This action returns a #${id} account`;
	}

	update(id: number, updateAccountDto: UpdateAccountDto) {
		return `This action updates a #${id} account`;
	}

	remove(id: number) {
		return `This action removes a #${id} account`;
	}
}
function getSquencialKey(): any {
	throw new Error("Function not implemented.");
}
