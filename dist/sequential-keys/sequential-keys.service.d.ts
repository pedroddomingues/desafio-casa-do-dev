import { Model } from "mongoose";
import { SequentialKeyDocument } from "./entities/sequential-key.entity";
export declare class SequentialKeysService {
    private sequentialKeyModel;
    constructor(sequentialKeyModel: Model<SequentialKeyDocument>);
    getSequentialKey(type: string): Promise<Number>;
    createSequentialKey(type: string): Promise<Number>;
    sequentialKeyToZerosString(sequentialKey: Number, size: number): String;
}
