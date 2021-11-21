import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { SequentialKeysModule } from "src/sequential-keys/sequential-keys.module";
import { Account, AccountSchema } from "./entities/account.entity";
import { UsersModule } from "src/users/users.module";
import { TransactionsModule } from "src/transactions/transactions.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
		forwardRef(() => UsersModule),
		forwardRef(() => TransactionsModule),
		SequentialKeysModule,
	],
	exports: [AccountsService],
	controllers: [AccountsController],
	providers: [AccountsService],
})
export class AccountsModule {}
