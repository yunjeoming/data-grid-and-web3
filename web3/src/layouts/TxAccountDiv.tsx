import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  styles?: string;
}

const TxAccountDiv: FC<Props> = ({ children, styles = '' }) => {
  return (
    <div
      className={`flex-grow flex items-center justify-between gap-2 [&>*]:text-sm [&>*]:text-center [&>div]:w-44 ${
        styles ?? ''
      }`}
    >
      {children}
    </div>
  );
};

export default TxAccountDiv;
