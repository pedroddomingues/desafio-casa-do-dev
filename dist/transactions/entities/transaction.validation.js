"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfTransactionIsPayment = exports.checkIfTransactionIsDeposit = exports.checkIfTransactionIsTransfer = void 0;
const transaction_type_1 = require("../../constants/transaction.type");
function checkIfTransactionIsTransfer(transaction) {
    return (this.type === transaction_type_1.TransactionType.transfer);
}
exports.checkIfTransactionIsTransfer = checkIfTransactionIsTransfer;
function checkIfTransactionIsDeposit(transaction) {
    return (this.type === transaction_type_1.TransactionType.deposit);
}
exports.checkIfTransactionIsDeposit = checkIfTransactionIsDeposit;
function checkIfTransactionIsPayment(transaction) {
    return (this.type === transaction_type_1.TransactionType.payment);
}
exports.checkIfTransactionIsPayment = checkIfTransactionIsPayment;
//# sourceMappingURL=transaction.validation.js.map