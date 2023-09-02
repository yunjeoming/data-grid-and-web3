'use client';

import React, { FC, useCallback, useEffect } from 'react';
import BasicModal from '@/components/Modal';
import UserForm from './UserForm';
import useModal from '@/hooks/useModal';
import { CommonUser } from '@/types/users';
import { UserService } from '@/services/users';
import { GridValidRowModel } from '@mui/x-data-grid';
import { ToolbarProps } from './Toolbar';
import { UserUtils } from '@/utils/users';

interface Props {
  userInfo: GridValidRowModel | null;
  setRows: ToolbarProps['setRows'];
  setInitSelectedUser: () => void;
}

const UpdateUser: FC<Props> = ({ userInfo, setRows, setInitSelectedUser }) => {
  const { modalState, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    if (userInfo) {
      handleOpenModal();
    }
  }, [userInfo, handleOpenModal]);

  const handleInitState = useCallback(() => {
    setInitSelectedUser();
    handleCloseModal();
  }, [setInitSelectedUser, handleCloseModal]);

  const handleUpdateUser = useCallback(
    async (user?: CommonUser) => {
      if (!user || !userInfo) return;

      const targetId = userInfo.id;
      const updatedUser = UserUtils.getUser(user, 'update');
      const data = await UserService.updateUser(targetId, updatedUser);
      if (data) {
        setRows((prevRows) => prevRows.map((row) => (row.id === targetId ? { ...row, ...updatedUser } : row)));
        handleInitState();
      }
    },
    [userInfo, setRows, handleInitState]
  );

  return userInfo ? (
    <BasicModal isOpened={modalState.isOpened} onClose={handleInitState} title="유저 정보">
      <UserForm
        user={{ ...userInfo }}
        buttonProps={{
          cancel: { text: '취소', fn: handleInitState },
          submit: { text: '수정', fn: handleUpdateUser },
        }}
      />
    </BasicModal>
  ) : null;
};

export default UpdateUser;
