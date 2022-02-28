"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === "object" &&
			typeof Reflect.decorate === "function"
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (
			typeof Reflect === "object" &&
			typeof Reflect.metadata === "function"
		)
			return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const brazilian_class_validator_1 = require("brazilian-class-validator");
const swagger_1 = require("@nestjs/swagger");
const account_entity_1 = require("../../accounts/entities/account.entity");
class CreateUserDto {}
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata("design:type", String),
	],
	CreateUserDto.prototype,
	"name",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, class_validator_1.IsEmail)(),
		__metadata("design:type", String),
	],
	CreateUserDto.prototype,
	"email",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, class_validator_1.IsNotEmpty)(),
		__metadata("design:type", String),
	],
	CreateUserDto.prototype,
	"password",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, brazilian_class_validator_1.IsCPF)(),
		__metadata("design:type", String),
	],
	CreateUserDto.prototype,
	"cpf",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, brazilian_class_validator_1.IsPhone)(),
		(0, class_validator_1.Length)(11, 11, {
			message:
				"Cellphone number must be 11 digits, 2 for DDD and 9 for number.",
		}),
		__metadata("design:type", String),
	],
	CreateUserDto.prototype,
	"phone",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, class_validator_1.IsNumber)(),
		(0, class_validator_1.Min)(0),
		__metadata("design:type", Number),
	],
	CreateUserDto.prototype,
	"overdraftLimit",
	void 0
);
exports.CreateUserDto = CreateUserDto;
class CreatedUserDto {}
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", String)],
	CreatedUserDto.prototype,
	"_id",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", String)],
	CreatedUserDto.prototype,
	"name",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", String)],
	CreatedUserDto.prototype,
	"email",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", String)],
	CreatedUserDto.prototype,
	"cpf",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", String)],
	CreatedUserDto.prototype,
	"phone",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)({ type: () => account_entity_1.Account }),
		__metadata("design:type", account_entity_1.Account),
	],
	CreatedUserDto.prototype,
	"account",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", Date)],
	CreatedUserDto.prototype,
	"createdAt",
	void 0
);
__decorate(
	[(0, swagger_1.ApiProperty)(), __metadata("design:type", Date)],
	CreatedUserDto.prototype,
	"updatedAt",
	void 0
);
exports.CreatedUserDto = CreatedUserDto;
//# sourceMappingURL=create-user.dto.js.map
