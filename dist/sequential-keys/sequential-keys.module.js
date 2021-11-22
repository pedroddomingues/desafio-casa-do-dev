"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialKeysModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const sequential_key_entity_1 = require("./entities/sequential-key.entity");
const sequential_keys_service_1 = require("./sequential-keys.service");
let SequentialKeysModule = class SequentialKeysModule {
};
SequentialKeysModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: sequential_key_entity_1.SequentialKey.name, schema: sequential_key_entity_1.SequentialKeySchema },
            ]),
        ],
        exports: [sequential_keys_service_1.SequentialKeysService],
        providers: [sequential_keys_service_1.SequentialKeysService],
    })
], SequentialKeysModule);
exports.SequentialKeysModule = SequentialKeysModule;
//# sourceMappingURL=sequential-keys.module.js.map