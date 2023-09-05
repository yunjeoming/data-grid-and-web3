import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  styles?: string;
}

const TxDiv: FC<Props> = ({ children, styles = '' }) => {
  return (
    <div
      className={`flex gap-6 items-center py-4 [&>*]:text-center [&>*:nth-child(2)]:basis-24 [&>*:nth-child(3)]:basis-32 ${
        styles ?? ''
      }`}
    >
      {children}
    </div>
  );
};

export default TxDiv;
