import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { SequentialKeysModule } from "src/sequential-keys/sequential-keys.module";
import { SequentialKeysService } from "src/sequential-keys/sequential-keys.service";
import { Account, AccountSchema } from "./entities/account.entity";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
		SequentialKeysModule,
	],
	controllers: [AccountsController],
	providers: [AccountsService],
})
export class AccountsModule {}
