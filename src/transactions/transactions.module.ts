import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { AccountsModule } from "src/accounts/accounts.module";
import { UsersModule } from "src/users/users.module";
import { Transaction, TransactionSchema } from "./entities/transaction.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Transaction.name, schema: TransactionSchema },
		]),
		forwardRef(() => AccountsModule),
		forwardRef(() => UsersModule),
		AuthModule,
	],
	exports: [TransactionsService],
	controllers: [TransactionsController],
	providers: [TransactionsService],
})
export class TransactionsModule {}
