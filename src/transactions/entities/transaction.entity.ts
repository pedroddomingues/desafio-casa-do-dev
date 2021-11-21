import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongoSchema } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import {
	checkIfTransactionIsPayment,
	checkIfTransactionIsTransfer,
} from "./transaction.validation";
import { TransactionType } from "../../constants/transaction.type";
import { Account } from "src/accounts/entities/account.entity";

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
	@ApiProperty({ type: () => Account })
	@Prop({
		type: mongoSchema.Types.ObjectId,
		ref: "Account",
		required: true,
	})
	from: Account;

	@ApiPropertyOptional({ type: () => Account })
	@Prop({
		type: mongoSchema.Types.ObjectId,
		ref: "Account",
		required: checkIfTransactionIsTransfer,
	})
	to: Account;

	@ApiProperty()
	@Prop({
		enum: TransactionType,
		required: true,
	})
	type: string;

	@ApiProperty()
	@Prop({ required: true, min: 0.01 })
	value: number;

	@ApiPropertyOptional()
	@Prop({ required: checkIfTransactionIsPayment })
	description?: string;

	@ApiPropertyOptional()
	@Prop()
	name?: string;

	@ApiProperty()
	@Prop()
	createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
