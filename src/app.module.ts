import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./users/users.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { SequentialKeysModule } from "./sequential-keys/sequential-keys.module";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.s5zun.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
		),
		AuthModule,
		UsersModule,
		AccountsModule,
		TransactionsModule,
		SequentialKeysModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
