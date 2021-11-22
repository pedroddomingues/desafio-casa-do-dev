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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUserByCPF(cpf, password) {
        const user = await this.usersService.findOneByCPF(cpf);
        if (!user) {
            throw new common_1.HttpException({
                message: "User not found.",
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (await this.checkPassword(password, user)) {
            user.password = undefined;
            return user;
        }
        throw new common_1.HttpException({
            message: "Wrong password.",
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
    async loginWithCPF(user) {
        const payload = { sub: user._id, accountId: user.account };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: `${process.env.JWT_SECRET}`,
            }),
        };
    }
    async checkPassword(password, user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.HttpException({
                message: "Invalid credentials.",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return isMatch;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map