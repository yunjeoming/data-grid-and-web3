import { FC, ReactNode } from 'react';

const Section: FC<{ children: ReactNode }> = ({ children }) => {
  return <section className="w-full flex flex-col gap-4 items-center p-8 rounded-md border">{children}</section>;
};

export default Section;
