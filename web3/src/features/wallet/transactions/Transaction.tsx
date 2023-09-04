import { FC } from 'react';
import { BoxDiv, TxAccountDiv, TxDiv } from '@/layouts';
import { Transaction } from '@/types/wallet';

const Transaction: FC<Transaction> = ({ from, to, value, createdAt }) => {
  return (
    <TxDiv>
      <TxAccountDiv>
        <BoxDiv styles="overflow-hidden text-ellipsis">{from}</BoxDiv>
        <span>⇨</span>
        <BoxDiv styles="overflow-hidden text-ellipsis">{to}</BoxDiv>
      </TxAccountDiv>
      <span>{value}</span>
      <span className="text-xs">
        {createdAt.split('T')[0]} <br /> {new Date(createdAt).toLocaleTimeString()}
      </span>
    </TxDiv>
  );
};

export default Transaction;
