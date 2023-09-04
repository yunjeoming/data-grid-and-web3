'use client';

import { useCallback, useEffect } from 'react';
import { TransactionsState, updateTransactions } from '@/redux/actions/transactions';
import { RootState } from '@/redux/reducers';
import { WalletService } from '@/services/wallet';
import { WalletUtils } from '@/utils/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { TxAccountDiv, TxDiv } from '@/layouts';
import Transaction from './Transaction';

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector<RootState, TransactionsState>((state) => state.transactions);

  const loadTransactions = useCallback(async () => {
    if (!transactions) return;

    const txIds = Object.entries(transactions)
      .filter((transaction) => !WalletUtils.isTransactionType(transaction[1]))
      .map((transaction) => transaction[0]);

    if (txIds.length) {
      const allPromises = txIds.map((txId) => WalletService.getTransaction(txId));
      const responses = await Promise.allSettled(allPromises);
      const datas = WalletUtils.getSuccessDataFromResponses(responses).filter(WalletUtils.isTransactionType);
      dispatch(updateTransactions(datas));
    }
  }, [transactions]);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="w-full pb-8">
      <TxDiv styles="border-b">
        <TxAccountDiv>
          <div>FROM</div>
          <span>⇨</span>
          <div>TO</div>
        </TxAccountDiv>
        <span>금액</span>
        <span>날짜</span>
      </TxDiv>
      {transactions ? (
        Object.values(transactions || [])
          .sort((a, b) => (b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0))
          .map((transaction) =>
            WalletUtils.isTransactionType(transaction) ? <Transaction key={transaction.txId} {...transaction} /> : null
          )
      ) : (
        <div className="py-4 text-center text-gray-500">거래내역이 없습니다.</div>
      )}
    </div>
  );
};

export default Transactions;
