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
  convertRoundedValue: (value: string, fixed: number = 6) => {
    if (value.includes('.')) {
      return Number(value).toFixed(fixed);
    } else {
      return value;
    }
  },
  getDateAndTime: (createdAt: string) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  },
};
