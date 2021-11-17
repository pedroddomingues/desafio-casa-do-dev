import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongoSchema } from "mongoose";

import { Account } from "../../accounts/entities/account.entity";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name: string;
	@Prop({ required: true })
	email: string;
	@Prop({ required: true })
	password: string;
	@Prop({ required: true, unique: true })
	cpf: string;
	@Prop({ required: true })
	phone: string;
	@Prop({ type: mongoSchema.Types.ObjectId, ref: "Account" })
	account: Account;
	@Prop()
	createdAt: Date;
	@Prop()
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
