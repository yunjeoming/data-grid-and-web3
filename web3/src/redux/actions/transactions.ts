import { AllTransactions, Transaction } from '@/types/wallet';
import { ADD_TRANSACTION, UPDATE_TRANSACTIONS, UPDATE_IS_EXCHANGED, SET_EXCHANGE_FEE } from './actionConstants';

export interface TransactionsState {
  transactions: AllTransactions | null;
  isExchanged: boolean;
  fee: string | null;
}

export type TransactionsAction =
  | ReturnType<typeof addTransaction>
  | ReturnType<typeof updateTransactions>
  | ReturnType<typeof updateIsExchanged>
  | ReturnType<typeof setExchangeFee>;

export function addTransaction(transaction: { [txId: Transaction['txId']]: Pick<Transaction, 'createdAt'> }) {
  return {
    type: ADD_TRANSACTION as typeof ADD_TRANSACTION,
    payload: {
      transaction,
    },
  };
}

export function updateTransactions(transactions: Transaction[]) {
  return {
    type: UPDATE_TRANSACTIONS as typeof UPDATE_TRANSACTIONS,
    payload: {
      transactions,
    },
  };
}

export function updateIsExchanged(isExchanged: TransactionsState['isExchanged']) {
  return {
    type: UPDATE_IS_EXCHANGED as typeof UPDATE_IS_EXCHANGED,
    payload: {
      isExchanged,
    },
  };
}

export function setExchangeFee(fee: TransactionsState['fee']) {
  return {
    type: SET_EXCHANGE_FEE as typeof SET_EXCHANGE_FEE,
    payload: {
      fee,
    },
  };
}
