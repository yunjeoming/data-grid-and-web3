'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { WalletService } from '@/services/wallet';
import { RowDiv, Section } from '@/layouts';
import Dropdown from '@/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { AccountsState, updateAccount, setToAccount } from '@/redux/actions/accounts';
import { addTransaction } from '@/redux/actions/transactions';
import ExchangeFee from './ExchangeFee';

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const { allAccounts, fromAccount, toAccount } = useSelector<RootState, AccountsState>((state) => state.accounts);

  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

  const restAccounts = useMemo(() => {
    return allAccounts ? Object.keys(allAccounts).filter((account) => account !== fromAccount) : [];
  }, [allAccounts, fromAccount]);

  const isDisabledButton = useMemo(() => {
    return !value || value === '0' || value.endsWith('.') || !toAccount || isError;
  }, [value, toAccount, isError]);

  const handleChangeItem = useCallback((item: string) => {
    dispatch(setToAccount(item));
    setIsError(false);
  }, []);

  const isValidateValue = useCallback(
    (value: string) => {
      if (value && !/^\d+(\.\d*)?$/.test(value)) {
        return false;
      }

      const balance = allAccounts?.[fromAccount || '']?.balance;
      if (balance && Number(balance) < Number(value)) {
        setValue(balance);
        return false;
      }
      return true;
    },
    [allAccounts, fromAccount]
  );

  const handleChangeValue = useCallback(
    (e: ChangeEvent) => {
      const elem = e.target as HTMLInputElement;
      const value = elem.value;
      if (isValidateValue(value)) {
        setValue(value);
      }
    },
    [isValidateValue]
  );

  const handleClickExchange = async () => {
    if (!fromAccount || !toAccount) return;

    const data = await WalletService.sendTransaction({ fromAccount, toAccount, amount: value });
    if (data) {
      setValue('');
      const transaction = {
        [data.txId]: {
          createdAt: new Date().toISOString(),
        },
      };
      dispatch(addTransaction(transaction));

      // fromAccount 값 새로 불러오고 적용
      const newFromAccountInfo = await WalletService.getAccountInfoById(fromAccount);
      if (newFromAccountInfo) {
        dispatch(updateAccount(newFromAccountInfo));
      }
    }
  };

  useEffect(() => {
    if (fromAccount && fromAccount === toAccount) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [fromAccount]);

  return (
    <Section>
      <RowDiv>
        <span>TO</span>
        <Dropdown list={restAccounts} handleChangeItem={handleChangeItem} isError={isError} />
      </RowDiv>
      <RowDiv>
        <span>환전 금액</span>
        <input
          className="min-h-box text-center text-sm p-2 rounded-md border focus:outline-none focus:border-blue-400"
          onChange={handleChangeValue}
          value={value}
        />
      </RowDiv>
      <button
        onClick={handleClickExchange}
        disabled={isDisabledButton}
        className="w-full p-2 rounded-md bg-blue-400 text-white hover:bg-blue-500 disabled:cursor-default disabled:hover:bg-blue-400 disabled:opacity-60"
      >
        환전
      </button>
      <ExchangeFee />
    </Section>
  );
};

export default ExchangeForm;
