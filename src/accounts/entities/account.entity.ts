import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as mongoSchema } from "mongoose";

import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "../../users/entities/user.entity";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
	@ApiProperty()
	@Prop({
		index: true,
		unique: true,
		length: 6,
	})
	sequential_id: string;

	@Prop({ type: mongoSchema.Types.ObjectId, ref: "User" })
	user: User;

	@ApiProperty()
	@Prop({ type: Number, default: 0.0 })
	balance: number;

	@ApiProperty({ isArray: true, type: Transaction })
	@Prop({ type: Array(mongoSchema.Types.ObjectId), ref: "Transaction" })
	statement: Transaction[];

	@ApiProperty()
	@Prop({ type: Number })
	overdraftLimit: number;

	@ApiProperty()
	@Prop()
	createdAt: Date;

	@ApiProperty()
	@Prop()
	updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
