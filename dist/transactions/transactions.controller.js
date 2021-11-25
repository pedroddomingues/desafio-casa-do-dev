"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const transaction_type_1 = require("../constants/transaction.type");
const swagger_1 = require("@nestjs/swagger");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    create(createTransactionDto, req) {
        let result;
        switch (createTransactionDto.type) {
            case transaction_type_1.TransactionType.deposit:
                result = this.transactionsService.deposit(createTransactionDto);
                break;
            case transaction_type_1.TransactionType.whithdrawal:
                result =
                    this.transactionsService.withdrawal(createTransactionDto, req);
                break;
            case transaction_type_1.TransactionType.transfer:
                result =
                    this.transactionsService.transfer(createTransactionDto, req);
                break;
            case transaction_type_1.TransactionType.payment:
                result = this.transactionsService.payment(createTransactionDto, req);
                break;
            default:
                result = { error: "Invalid transaction type" };
        }
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
TransactionsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("transactions"),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map