import { Account, AllAccounts } from '@/types/wallet';
import { ADD_ACCOUNTS, SET_FROM_ACCOUNT, UPDATE_ACCOUNT, SET_TO_ACCOUNT, DELETE_ACCOUNTS } from './actionConstants';

export interface AccountsState {
  allAccounts: AllAccounts | null;
  fromAccount: Account['name'] | null;
  toAccount: Account['name'] | null;
}

export type AccountsAction =
  | ReturnType<typeof addAccounts>
  | ReturnType<typeof updateAccount>
  | ReturnType<typeof deleteAccounts>
  | ReturnType<typeof setFromAccount>
  | ReturnType<typeof setToAccount>;

export function addAccounts(accounts: AllAccounts) {
  return {
    type: ADD_ACCOUNTS as typeof ADD_ACCOUNTS,
    payload: {
      accounts,
    },
  };
}

export function updateAccount(account: Account) {
  return {
    type: UPDATE_ACCOUNT as typeof UPDATE_ACCOUNT,
    payload: {
      account,
    },
  };
}

export function deleteAccounts(accounts: Account['name'][]) {
  return {
    type: DELETE_ACCOUNTS as typeof DELETE_ACCOUNTS,
    payload: {
      accounts,
    },
  };
}

export function setFromAccount(fromAccount: Account['name']) {
  return {
    type: SET_FROM_ACCOUNT as typeof SET_FROM_ACCOUNT,
    payload: {
      fromAccount,
    },
  };
}

export function setToAccount(toAccount: Account['name']) {
  return {
    type: SET_TO_ACCOUNT as typeof SET_TO_ACCOUNT,
    payload: {
      toAccount,
    },
  };
}
