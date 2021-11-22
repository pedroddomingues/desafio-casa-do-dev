"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const sequential_keys_module_1 = require("../sequential-keys/sequential-keys.module");
const account_entity_1 = require("./entities/account.entity");
const users_module_1 = require("../users/users.module");
const transactions_module_1 = require("../transactions/transactions.module");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: account_entity_1.Account.name, schema: account_entity_1.AccountSchema },
            ]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => transactions_module_1.TransactionsModule),
            sequential_keys_module_1.SequentialKeysModule,
        ],
        exports: [accounts_service_1.AccountsService],
        controllers: [accounts_controller_1.AccountsController],
        providers: [accounts_service_1.AccountsService],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map