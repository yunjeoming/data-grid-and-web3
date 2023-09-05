import { useCallback, useState } from 'react';

const useModal = () => {
  const init = {
    isOpened: false,
  };

  const [modalState, setModalState] = useState(init);

  const handleOpenModal = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      isOpened: true,
    }));
  }, []);

  const handleCloseModal = () => {
    setModalState(init);
  };

  return { modalState, handleOpenModal, handleCloseModal };
};

export default useModal;
