import { AllTransactions } from '@/types/wallet';
import { TransactionsAction, TransactionsState } from '../actions/transactions';

const initTransactionsState = {
  transactions: null,
  isExchanged: false,
  fee: null,
};

export const transactionsReducer = (state: TransactionsState = initTransactionsState, action: TransactionsAction) => {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      /**
       * 트랜잭션 id 추가
       */

      const { transaction } = action.payload;
      const { transactions } = state;
      const newTransactions = transactions
        ? {
            ...transactions,
            ...transaction,
          }
        : { ...transaction };

      return {
        ...state,
        transactions: newTransactions,
        isExchanged: true,
      };
    }
    case 'UPDATE_TRANSACTIONS': {
      /**
       * 트랜잭션 정보 수정
       */

      const { transactions: inputTransactions } = action.payload;
      const { transactions } = state;

      const newTransactions: AllTransactions = transactions ? { ...transactions } : {};
      for (let transaction of inputTransactions) {
        newTransactions[transaction.txId] = {
          ...newTransactions[transaction.txId],
          ...transaction,
        };
      }

      return {
        ...state,
        transactions: newTransactions,
      };
    }
    case 'UPDATE_IS_EXCHANGED': {
      /**
       * 환전 alert 띄우고 없애기 위한 state
       */

      const { isExchanged } = action.payload;

      return {
        ...state,
        isExchanged,
      };
    }
    case 'SET_EXCHANGE_FEE': {
      /**
       * 환전(트랜잭션) 수수료 설정
       */

      const { fee } = action.payload;

      return {
        ...state,
        fee,
      };
    }
    default: {
      return state;
    }
  }
};
