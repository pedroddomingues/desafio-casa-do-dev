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
exports.AccountSchema = exports.Account = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Account = class Account {};
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)({
			index: true,
			unique: true,
			length: 6,
		}),
		__metadata("design:type", String),
	],
	Account.prototype,
	"sequential_id",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({
			type: mongoose_2.Schema.Types.ObjectId,
			ref: "User",
		}),
		__metadata("design:type", user_entity_1.User),
	],
	Account.prototype,
	"user",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)({ type: Number, default: 0.0 }),
		__metadata("design:type", Number),
	],
	Account.prototype,
	"balance",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)({
			isArray: true,
			type: transaction_entity_1.Transaction,
		}),
		(0, mongoose_1.Prop)({
			type: Array(mongoose_2.Schema.Types.ObjectId),
			ref: "Transaction",
		}),
		__metadata("design:type", Array),
	],
	Account.prototype,
	"statement",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)({ type: Number }),
		__metadata("design:type", Number),
	],
	Account.prototype,
	"overdraftLimit",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)(),
		__metadata("design:type", Date),
	],
	Account.prototype,
	"createdAt",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)(),
		__metadata("design:type", Date),
	],
	Account.prototype,
	"updatedAt",
	void 0
);
Account = __decorate([(0, mongoose_1.Schema)({ timestamps: true })], Account);
exports.Account = Account;
exports.AccountSchema = mongoose_1.SchemaFactory.createForClass(Account);
//# sourceMappingURL=account.entity.js.map
