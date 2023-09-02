'use client';

import { FC } from 'react';
import BasicModal from '@/components/Modal';
import useModal from '@/hooks/useModal';
import { UserService } from '@/services/users';
import { DeleteResponse } from '@/types/users';
import { Button } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { ToolbarProps } from './Toolbar';

const DeleteUser: FC<ToolbarProps> = ({ selectedRows, setRows }) => {
  const { modalState, handleOpenModal, handleCloseModal } = useModal();

  const getSuccessIdsFromResponses = (responses: PromiseSettledResult<DeleteResponse>[]) => {
    let successedIds: string[] = [];

    for (let response of responses) {
      if (response.status !== 'fulfilled') continue;

      if (response.value.status === 'success' && response.value.id) {
        successedIds.push(response.value.id);
      }

      if (response.value.status === 'error') {
        console.error(`사용자 삭제에 실패했습니다. id:(${response.value.id}) `, response.value.err);
      }
    }
    return successedIds;
  };

  const handleDeleteUsers = async () => {
    const allPromises = selectedRows.map((row) => {
      return UserService.deleteUser(row.toString());
    });

    const responses = await Promise.allSettled(allPromises);
    let successedIds = getSuccessIdsFromResponses(responses);

    if (successedIds.length) {
      setRows((prevRows) => prevRows.filter((row) => !successedIds.includes(row.id)));
      handleCloseModal();
    }
  };

  return (
    <>
      {selectedRows.length ? (
        <Button color="error" startIcon={<GridDeleteIcon />} disabled={!selectedRows.length} onClick={handleOpenModal}>
          Delete
        </Button>
      ) : null}
      <BasicModal
        isOpened={modalState.isOpened}
        title="선택 항목을 삭제하시겠습니까?"
        onClose={handleCloseModal}
        onOkFn={handleDeleteUsers}
        hasFooter
      >
        <p>{selectedRows.length}개 항목이 삭제됩니다.</p>
      </BasicModal>
    </>
  );
};

export default DeleteUser;
