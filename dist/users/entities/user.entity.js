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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_entity_1 = require("../../accounts/entities/account.entity");
let User = class User {};
__decorate(
	[
		(0, mongoose_1.Prop)({ required: true }),
		__metadata("design:type", String),
	],
	User.prototype,
	"name",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({ required: true }),
		__metadata("design:type", String),
	],
	User.prototype,
	"email",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({ required: true }),
		__metadata("design:type", String),
	],
	User.prototype,
	"password",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({ required: true, unique: true }),
		__metadata("design:type", String),
	],
	User.prototype,
	"cpf",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({ required: true }),
		__metadata("design:type", String),
	],
	User.prototype,
	"phone",
	void 0
);
__decorate(
	[
		(0, mongoose_1.Prop)({
			type: mongoose_2.Schema.Types.ObjectId,
			ref: "Account",
		}),
		__metadata("design:type", account_entity_1.Account),
	],
	User.prototype,
	"account",
	void 0
);
__decorate(
	[(0, mongoose_1.Prop)(), __metadata("design:type", Date)],
	User.prototype,
	"createdAt",
	void 0
);
__decorate(
	[(0, mongoose_1.Prop)(), __metadata("design:type", Date)],
	User.prototype,
	"updatedAt",
	void 0
);
User = __decorate([(0, mongoose_1.Schema)({ timestamps: true })], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map
