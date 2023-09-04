import { AccountsAction, AccountsState } from '../actions/accounts';

export const initAccountsState = {
  allAccounts: null,
  fromAccount: null,
  toAccount: null,
};

export const accountsReducer = (state: AccountsState = initAccountsState, action: AccountsAction) => {
  switch (action.type) {
    case 'ADD_ACCOUNTS': {
      /**
       * 모든 계좌 등록
       */

      const { accounts } = action.payload;
      const { allAccounts } = state;
      const newAccounts = allAccounts ? { ...allAccounts, ...accounts } : { ...accounts };

      return {
        ...state,
        allAccounts: newAccounts,
      };
    }
    case 'UPDATE_ACCOUNT': {
      /**
       * 하나의 계좌 정보 수정
       */

      const { account } = action.payload;
      const { allAccounts } = state;

      const newAllAccounts = allAccounts ? { ...allAccounts, [account.name]: account } : { [account.name]: account };

      return {
        ...state,
        allAccounts: newAllAccounts,
      };
    }
    case 'DELETE_ACCOUNTS': {
      /**
       * 계좌 변동이 생긴 후 불필요한 계좌는 삭제
       */

      const { accounts } = action.payload;
      const { allAccounts } = state;

      const newAllAccounts = { ...allAccounts };

      for (let account of accounts) {
        delete newAllAccounts[account];
      }

      return {
        ...state,
        allAccounts: newAllAccounts,
      };
    }
    case 'SET_FROM_ACCOUNT': {
      /**
       * from 계좌 등록
       */

      const { fromAccount } = action.payload;

      return {
        ...state,
        fromAccount,
      };
    }
    case 'SET_TO_ACCOUNT': {
      /**
       * to 계좌 등록
       */

      const { toAccount } = action.payload;

      return {
        ...state,
        toAccount,
      };
    }
    default: {
      return state;
    }
  }
};
