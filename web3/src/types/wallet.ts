export interface Account {
  name: string;
  balance: string;
}

export interface AllAccounts {
  [key: Account['name']]: Account | null;
}

export interface Transaction {
  txId: string;
  from: Account['name'];
  to: Account['name'];
  value: string;
  createdAt: string;
}

export type TransactionInfo = Transaction | Pick<Transaction, 'createdAt'>;

export interface AllTransactions {
  [key: Transaction['txId']]: TransactionInfo;
}
