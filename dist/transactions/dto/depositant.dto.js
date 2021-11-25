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
exports.DepositantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const brazilian_class_validator_1 = require("brazilian-class-validator");
const class_validator_1 = require("class-validator");
class DepositantDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DepositantDto.prototype, "name", void 0);
__decorate([
    (0, brazilian_class_validator_1.IsCPF)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DepositantDto.prototype, "cpf", void 0);
exports.DepositantDto = DepositantDto;
//# sourceMappingURL=depositant.dto.js.map