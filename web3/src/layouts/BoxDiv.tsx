import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  styles?: string;
  isError?: boolean;
}

const BoxDiv: FC<Props> = ({ children, onClick, styles = '', isError = false }) => {
  return (
    <div onClick={onClick} className={`min-h-box text-center text-sm p-2 rounded-md border ${styles ?? ''} ${isError ? "border-red-600" : ""}`}>
      {children}
    </div>
  );
};

export default BoxDiv;
