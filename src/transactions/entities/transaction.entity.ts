import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongoSchema } from "mongoose";

import { User } from "../../users/entities/user.entity";
import { checkIfTransactionIsTransfer } from "./transaction.validation";

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
	@Prop({ type: mongoSchema.Types.ObjectId, ref: "User", required: true })
	from: User;
	@Prop({ type: mongoSchema.Types.ObjectId, ref: "User", required: checkIfTransactionIsTransfer })
	to: User;
	@Prop({
		enum: ["deposit", "withdrawal", "income_transfer", "outcome_transfer", "payment"],
		required: true,
	})
	type: string;
	@Prop({ required: true })
	amount: number;
	@Prop()
	description: string;
	@Prop()
	createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
