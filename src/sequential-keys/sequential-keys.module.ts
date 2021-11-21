import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

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
