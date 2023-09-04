import { combineReducers } from 'redux';
import { accountsReducer } from './accounts';
import { transactionsReducer } from './transactions';
import { AccountsState } from '../actions/accounts';
import { TransactionsState } from '../actions/transactions';

export interface RootState {
  accounts: AccountsState;
  transactions: TransactionsState;
}

const rootReducer = combineReducers<RootState>({
  accounts: accountsReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
