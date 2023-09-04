'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { AccountsState, addAccounts, deleteAccounts, setFromAccount, updateAccount } from '@/redux/actions/accounts';
import Dropdown from '@/components/Dropdown';
import { WalletService } from '@/services/wallet';
import { Account, AllAccounts } from '@/types/wallet';
import { BoxDiv, RowDiv, Section } from '@/layouts';

const MyAccounts: FC<{ accounts: Account['name'][] }> = ({ accounts }) => {
  const dispatch = useDispatch();
  const { allAccounts, fromAccount } = useSelector<RootState, AccountsState>((state) => state.accounts);

  const balance = useMemo(() => {
    const noneValue = '-';
    if (!fromAccount || !allAccounts) return noneValue;
    return allAccounts[fromAccount]?.balance || noneValue;
  }, [fromAccount, allAccounts]);

  const loadAccounts = useCallback(() => {
    const savedAccounts = allAccounts ? Object.keys(allAccounts) : [];

    const newAccounts = accounts.filter((account) => !savedAccounts.includes(account));
    if (newAccounts) {
      const accountsObj: AllAccounts = {};
      for (let newAccount of newAccounts) {
        accountsObj[newAccount] = null;
      }
      dispatch(addAccounts(accountsObj));
    }

    const deprecatedAccounts = savedAccounts.filter((savedAccount) => !accounts.includes(savedAccount));
    if (deprecatedAccounts) {
      dispatch(deleteAccounts(deprecatedAccounts));
    }
  }, [allAccounts, accounts]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleChangeItem = useCallback(
    async (item: Account['name']) => {
      dispatch(setFromAccount(item));

      const hasAccountInfo = allAccounts?.[item];
      if (hasAccountInfo) return;

      const accountInfo = await WalletService.getAccountInfoById(item);
      if (accountInfo) {
        dispatch(updateAccount(accountInfo));
      }
    },
    [allAccounts, dispatch]
  );

  useEffect(() => {
    console.log(allAccounts);
  }, [allAccounts]);

  return (
    <Section>
      <RowDiv>
        <span>FROM</span>
        <Dropdown list={accounts} handleChangeItem={handleChangeItem} targetItem={fromAccount} />
      </RowDiv>
      <RowDiv>
        <span>현재 잔액</span>
        <BoxDiv>{balance}</BoxDiv>
      </RowDiv>
    </Section>
  );
};

export default MyAccounts;
