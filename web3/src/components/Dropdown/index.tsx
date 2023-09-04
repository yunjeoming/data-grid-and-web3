import { BoxDiv } from '@/layouts';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  list: string[];
  handleChangeItem?: (item: string) => void;
  isError?: boolean;
  targetItem?: string | null;
}

const Dropdown: FC<Props> = ({ list, handleChangeItem, isError, targetItem }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(targetItem || null);

  const handleClickSelect = useCallback(() => {
    const ul = listRef.current;
    if (ul) {
      ul.classList.toggle('active');
    }
  }, []);

  const handleClickOption = useCallback(
    (item: string) => {
      return () => {
        setSelectedItem(item);
        handleChangeItem && handleChangeItem(item);
        handleClickSelect();
      };
    },
    [handleClickSelect, handleChangeItem]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      if (!listRef.current?.clientHeight) return;

      const elem = e.target as HTMLElement;
      if (!parentRef.current?.contains(elem)) {
        handleClickSelect();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div className="relative" ref={parentRef}>
      <BoxDiv onClick={handleClickSelect} styles="cursor-pointer border" isError={isError}>
        {selectedItem ?? '== 선택 =='}
      </BoxDiv>
      <ul
        className="dropdown bg-white w-full max-h-0 overflow-hidden absolute top-full left-0 shadow-md rounded-md z-10"
        ref={listRef}
      >
        {list.map((item, idx) => (
          <li
            key={`${item}-${idx}`}
            onClick={handleClickOption(item)}
            className={`text-center text-sm cursor-pointer p-1 hover:bg-gray-50 ${
              selectedItem === item ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
