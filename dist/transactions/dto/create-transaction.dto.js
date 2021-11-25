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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transaction_type_1 = require("../../constants/transaction.type");
const depositant_dto_1 = require("./depositant.dto");
class CreateTransactionDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(transaction_type_1.TransactionType),
    (0, swagger_1.ApiProperty)({ enum: transaction_type_1.TransactionType }),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type !== transaction_type_1.TransactionType.deposit),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === transaction_type_1.TransactionType.deposit || o.type === transaction_type_1.TransactionType.transfer),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === transaction_type_1.TransactionType.deposit),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => depositant_dto_1.DepositantDto),
    (0, swagger_1.ApiPropertyOptional)({ type: () => depositant_dto_1.DepositantDto }),
    __metadata("design:type", depositant_dto_1.DepositantDto)
], CreateTransactionDto.prototype, "depositant", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === transaction_type_1.TransactionType.payment),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "description", void 0);
exports.CreateTransactionDto = CreateTransactionDto;
//# sourceMappingURL=create-transaction.dto.js.map