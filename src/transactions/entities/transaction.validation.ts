import { TransactionType } from "src/constants/transaction.type";
import { TransactionSchema as Transaction } from "./transaction.entity";

export function checkIfTransactionIsTransfer(
	transaction: typeof Transaction
): boolean {
	return this.type === TransactionType.transfer;
}

export function checkIfTransactionIsDeposit(
	transaction: typeof Transaction
): boolean {
	return this.type === TransactionType.deposit;
}

export function checkIfTransactionIsPayment(
	transaction: typeof Transaction
): boolean {
	return this.type === TransactionType.payment;
}
