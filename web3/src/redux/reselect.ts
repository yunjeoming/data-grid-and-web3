import { createSelector } from 'reselect';
import { RootState } from './reducers';

const accountsSelector = (state: RootState) => state.accounts;
const fromAccountSelector = (state: RootState) => state.accounts.fromAccount;
const allAccountsSelector = (state: RootState) => state.accounts.allAccounts;
const feeSelector = (state: RootState) => state.transactions.fee;

export const memoizedAccountsAndFee = createSelector([accountsSelector, feeSelector], (accounts, fee) => ({
  ...accounts,
  fee,
}));

export const memoizedAllCounts = createSelector(
  [fromAccountSelector, allAccountsSelector],
  (fromAccount, allAccounts) => ({
    fromAccount,
    allAccounts,
  })
);
