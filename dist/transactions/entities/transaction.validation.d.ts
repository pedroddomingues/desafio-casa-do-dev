import { TransactionSchema as Transaction } from "./transaction.entity";
export declare function checkIfTransactionIsTransfer(transaction: typeof Transaction): boolean;
export declare function checkIfTransactionIsDeposit(transaction: typeof Transaction): boolean;
export declare function checkIfTransactionIsPayment(transaction: typeof Transaction): boolean;
