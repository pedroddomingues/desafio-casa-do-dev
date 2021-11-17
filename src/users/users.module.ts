import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./entities/user.entity";
import { Account, AccountSchema } from "src/accounts/entities/account.entity";
import { SequentialKeysService } from "src/sequential-keys/sequential-keys.service";
import { AccountsService } from "src/accounts/accounts.service";
import { SequentialKeysModule } from "src/sequential-keys/sequential-keys.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
		SequentialKeysModule,
	],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService, AccountsService],
})
export class UsersModule {}
