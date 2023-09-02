'use client';

import BasicModal from '@/components/Modal';
import UserForm from '@/features/users/UserForm';
import useModal from '@/hooks/useModal';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { UserService } from '@/services/users';
import { CommonUser } from '@/types/users';
import { FC, useCallback } from 'react';
import { ToolbarProps } from './Toolbar';
import { UserUtils } from '@/utils/users';

const CreateUser: FC<Pick<ToolbarProps, 'setRows'>> = ({ setRows }) => {
  const { modalState, handleOpenModal, handleCloseModal } = useModal();

  const handleCreateUser = useCallback(
    async (user?: CommonUser) => {
      if (!user) return;

      const newUser = UserUtils.getUser(user, 'create');
      const data = await UserService.addUser(newUser);
      if (data) {
        setRows((prevRows) => [...prevRows, data]);
        handleCloseModal();
      }
    },
    [handleCloseModal, setRows]
  );

  return (
    <div>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
        Add
      </Button>
      <BasicModal isOpened={modalState.isOpened} title="유저 등록" onClose={handleCloseModal}>
        <UserForm
          buttonProps={{
            cancel: { text: '취소', fn: handleCloseModal },
            submit: { text: '등록', fn: handleCreateUser },
          }}
        />
      </BasicModal>
    </div>
  );
};

export default CreateUser;
