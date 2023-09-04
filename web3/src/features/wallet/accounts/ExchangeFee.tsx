'use client';

import { useCallback, useEffect } from 'react';
import { TransactionsState, setExchangeFee } from '@/redux/actions/transactions';
import { RootState } from '@/redux/reducers';
import { WalletService } from '@/services/wallet';
import { useDispatch, useSelector } from 'react-redux';

const ExchangeFee = () => {
  const dispatch = useDispatch();
  const { fee } = useSelector<RootState, TransactionsState>((state) => state.transactions);

  const loadEstimatedFee = useCallback(async () => {
    const data = await WalletService.getEstimatedFee();
    if (data) {
      dispatch(setExchangeFee(data.fee));
    }
  }, []);

  useEffect(() => {
    if (!fee) {
      loadEstimatedFee();
    }
  }, []);

  return <div className="text-sm text-gray-500 self-end">※ 환전 1회당 {fee ?? 0.000042} 수수료가 부과됩니다.</div>;
};

export default ExchangeFee;
