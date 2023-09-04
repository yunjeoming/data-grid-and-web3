import { Account, Transaction } from '@/types/wallet';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const requestAxios = async <T>(config: AxiosRequestConfig) => {
  config.baseURL = BASE_URL;

  try {
    const response = await axios(config);
    if (!response.status.toString().startsWith('2')) {
      throw Error('invalid status num');
    }
    return response.data.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        console.error(error.response.data);
      }
    } else {
      console.error(error);
    }
  }
};

export const WalletService = {
  getAccounts: async () => {
    return await requestAxios<{ accounts: Account['name'][] }>({ url: '/accounts' });
  },
  getAccountInfoById: async (id: string) => {
    return await requestAxios<Account>({ url: `/accounts/${id}` });
  },
  getTransaction: async (id: string) => {
    return await requestAxios<Transaction>({ url: `/transactions/${id}`, method: 'GET' });
  },
  sendTransaction: async (data: { fromAccount: string; toAccount: string; amount: string }) => {
    return await requestAxios<Transaction>({ url: '/transactions', method: 'POST', data });
  },
  getEstimatedFee: async () => {
    return await requestAxios<{ fee: string }>({ url: '/transactions/fee', method: 'GET' });
  },
};
