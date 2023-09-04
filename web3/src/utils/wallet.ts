import { Transaction } from '@/types/wallet';

export const WalletUtils = {
  isTransactionType: <T>(transaction: Transaction | T): transaction is Transaction => {
    return (transaction as Transaction).txId !== undefined;
  },
  getSuccessDataFromResponses: <T>(responses: PromiseSettledResult<T>[]) => {
    let successDatas: T[] = [];

    for (let response of responses) {
      if (response.status === 'fulfilled') {
        successDatas.push(response.value);
      }
    }

    return successDatas;
  },
};
