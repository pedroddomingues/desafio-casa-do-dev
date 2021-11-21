import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SequentialKeyDocument = SequentialKey & Document;

@Schema({ timestamps: true })
export class SequentialKey {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	value: number;
}

export const SequentialKeySchema = SchemaFactory.createForClass(SequentialKey);
