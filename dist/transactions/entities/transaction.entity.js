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
exports.TransactionSchema = exports.Transaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const transaction_validation_1 = require("./transaction.validation");
const transaction_type_1 = require("../../constants/transaction.type");
const account_entity_1 = require("../../accounts/entities/account.entity");
const depositant_dto_1 = require("../dto/depositant.dto");
let Transaction = class Transaction {};
__decorate(
	[
		(0, swagger_1.ApiProperty)({ type: () => account_entity_1.Account }),
		(0, mongoose_1.Prop)({
			type: mongoose_2.Schema.Types.ObjectId,
			ref: "Account",
			required: true,
		}),
		__metadata("design:type", account_entity_1.Account),
	],
	Transaction.prototype,
	"from",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiPropertyOptional)({
			type: () => account_entity_1.Account,
		}),
		(0, mongoose_1.Prop)({
			type: mongoose_2.Schema.Types.ObjectId,
			ref: "Account",
			required: transaction_validation_1.checkIfTransactionIsTransfer,
		}),
		__metadata("design:type", account_entity_1.Account),
	],
	Transaction.prototype,
	"to",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)({
			enum: transaction_type_1.TransactionType,
			required: true,
		}),
		__metadata("design:type", String),
	],
	Transaction.prototype,
	"type",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)({ required: true, min: 0.01 }),
		__metadata("design:type", Number),
	],
	Transaction.prototype,
	"value",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiPropertyOptional)(),
		(0, mongoose_1.Prop)({
			required: transaction_validation_1.checkIfTransactionIsPayment,
		}),
		__metadata("design:type", String),
	],
	Transaction.prototype,
	"description",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)(),
		(0, swagger_1.ApiPropertyOptional)({
			type: () => depositant_dto_1.DepositantDto,
		}),
		__metadata("design:type", depositant_dto_1.DepositantDto),
	],
	Transaction.prototype,
	"depositant",
	void 0
);
__decorate(
	[
		(0, swagger_1.ApiProperty)(),
		(0, mongoose_1.Prop)(),
		__metadata("design:type", Date),
	],
	Transaction.prototype,
	"createdAt",
	void 0
);
Transaction = __decorate(
	[(0, mongoose_1.Schema)({ timestamps: true })],
	Transaction
);
exports.Transaction = Transaction;
exports.TransactionSchema =
	mongoose_1.SchemaFactory.createForClass(Transaction);
//# sourceMappingURL=transaction.entity.js.map
