'use client';

import { useEffect } from 'react';
import { TransactionsState, updateIsExchanged } from '@/redux/actions/transactions';
import { RootState } from '@/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

const ExchangeAlert = () => {
  const dispatch = useDispatch();
  const { isExchanged } = useSelector<RootState, TransactionsState>((state) => state.transactions);

  const handleCloseAlert = () => {
    dispatch(updateIsExchanged(false));
  };

  useEffect(() => {
    if (isExchanged) {
      setTimeout(() => {
        handleCloseAlert();
      }, 3000);
    }
  }, [isExchanged, handleCloseAlert]);

  return isExchanged ? (
    <div className="w-full bg-blue-500 flex justify-between text-white p-6 rounded-md">
      <span>환전을 완료했습니다.</span>
      <button onClick={handleCloseAlert}>X</button>
    </div>
  ) : null;
};

export default ExchangeAlert;
