import { Document } from "mongoose";
export declare type SequentialKeyDocument = SequentialKey & Document;
export declare class SequentialKey {
    type: string;
    value: number;
}
export declare const SequentialKeySchema: import("mongoose").Schema<Document<SequentialKey, any, any>, import("mongoose").Model<Document<SequentialKey, any, any>, any, any, any>, {}>;
