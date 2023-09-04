import { FC, ReactNode } from 'react';

const RowDiv: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex gap-4 items-center [&>span]:min-w-[64px] [&>span]:text-center [&>*:last-child]:flex-grow">
      {children}
    </div>
  );
};

export default RowDiv;
