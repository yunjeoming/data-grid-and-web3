import { FC } from 'react';
import { BoxDiv, TxAccountDiv, TxDiv } from '@/layouts';
import { Transaction } from '@/types/wallet';
import { WalletUtils } from '@/utils/wallet';

const Transaction: FC<Transaction> = ({ from, to, value, createdAt }) => {
  const { date, time } = WalletUtils.getDateAndTime(createdAt);

  return (
    <TxDiv>
      <TxAccountDiv>
        <BoxDiv styles="overflow-hidden text-ellipsis">{from}</BoxDiv>
        <span>⇨</span>
        <BoxDiv styles="overflow-hidden text-ellipsis">{to}</BoxDiv>
      </TxAccountDiv>
      <span className="text-sm">{WalletUtils.convertRoundedValue(value)}</span>
      <span className="text-xs">
        {date} <br /> {time}
      </span>
    </TxDiv>
  );
};

export default Transaction;
