import { TransactionSchema as Transaction } from "./transaction.entity";

export function checkIfTransactionIsTransfer(
	transaction: typeof Transaction
): boolean {
	return this.type === "income_transfer" || this.type === "outcome_transfer";
}
