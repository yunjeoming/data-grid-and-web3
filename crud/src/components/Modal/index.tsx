'use client';

import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import { Button, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

interface ModalProps {
  children?: ReactNode;
  isOpened: boolean;
  onClose: () => void;
  title: string;
  okText?: string;
  cancelText?: string;
  onOkFn?: () => void;
  onCancelFn?: () => void;
  hasFooter?: boolean;
}

export default function BasicModal({
  children,
  isOpened,
  onClose,
  title,
  okText,
  cancelText,
  onOkFn,
  onCancelFn,
  hasFooter = false,
}: ModalProps) {
  return (
    <Modal
      open={isOpened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
        <div className="relative">
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }} size="small">
            <CloseOutlined />
          </IconButton>
          <div className="flex flex-col gap-4 p-8">
            <h6 className="text-xl font-medium">{title || '제목을 입력해주세요'}</h6>
            {children}
          </div>
          {hasFooter && (
            <div className="flex justify-end gap-1 px-4 py-2">
              <Button onClick={onCancelFn ?? onClose}>{cancelText ?? '취소'}</Button>
              <Button onClick={onOkFn ?? onClose}>{okText ?? '확인'}</Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
