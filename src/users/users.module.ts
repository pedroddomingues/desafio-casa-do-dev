import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./entities/user.entity";
import { Account, AccountSchema } from "src/accounts/entities/account.entity";
import { SequentialKeysModule } from "src/sequential-keys/sequential-keys.module";
import { AccountsModule } from "src/accounts/accounts.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		SequentialKeysModule,
		forwardRef(() => AccountsModule),
	],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
