import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
	SequentialKey,
	SequentialKeyDocument,
} from "./entities/sequential-key.entity";

@Injectable()
export class SequentialKeysService {
	constructor(
		@InjectModel(SequentialKey.name)
		private sequentialKeyModel: Model<SequentialKeyDocument>
	) {}

	async getSequentialKey(type: string): Promise<number> {
		const sequentialKey = await this.sequentialKeyModel.findOne({ type });

		if (!sequentialKey) {
			return this.createSequentialKey(type);
		}
		if (sequentialKey.value > 999998) {
			return 0;
		}
		sequentialKey.value++;
		await sequentialKey.save();
		return sequentialKey.value;
	}

	async createSequentialKey(type: string): Promise<number> {
		const sequentialKey = new this.sequentialKeyModel({ type, value: 1 });

		await sequentialKey.save();

		return sequentialKey.value;
	}

	sequentialKeyToZerosString(sequentialKey: number, size: number): string {
		const string = sequentialKey.toString();
		const stringSize = string.length;
		let result = "";
		for (let i = 0; i < size - stringSize; i++) {
			result += "0";
		}
		return result + string;
	}
}
