import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/accounts/entities/account.entity";
import {
	SequentialKey,
	SequentialKeySchema,
} from "./entities/sequential-key.entity";
import { SequentialKeysService } from "./sequential-keys.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: SequentialKey.name, schema: SequentialKeySchema },
		]),
	],
	exports: [SequentialKeysService],
	providers: [SequentialKeysService],
})
export class SequentialKeysModule {}
