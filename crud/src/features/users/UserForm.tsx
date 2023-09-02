'use client';

import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import TextInput from '../../components/Input/TextInput';
import { Button } from '@mui/material';
import { CommonUser } from '@/types/users';
import { UserUtils } from '@/utils/users';

interface Props {
  user?: {
    name?: string;
    age?: number;
    phone?: string;
  };
  buttonProps?: Partial<Record<'submit' | 'cancel', { text: string; fn: (user?: CommonUser) => Promise<void> | void }>>;
}

const UserForm: FC<Props> = ({ user, buttonProps }) => {
  const [values, setValues] = useState({
    name: user?.name ?? '',
    age: user?.age ?? '',
    phone: user?.phone ?? '',
  });
  const { name, age, phone } = values;

  const handleChangeInput = useCallback((e: ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    const newValues = UserUtils.getUser(values as CommonUser, 'update');

    if (buttonProps?.submit?.fn) {
      buttonProps.submit.fn(newValues);
    }
  }, [values, buttonProps]);

  const handleCancel = useCallback(() => {
    if (buttonProps?.cancel?.fn) {
      buttonProps.cancel.fn();
    }
  }, [buttonProps]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 mb-4">
        <TextInput labelText="name" name="name" value={name} onChange={handleChangeInput} />
        <TextInput type="number" labelText="age" name="age" value={age} onChange={handleChangeInput} />
        <TextInput type="tel" labelText="phone number" name="phone" value={phone} onChange={handleChangeInput} />
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel}>{buttonProps?.cancel?.text || '취소'}</Button>
        <Button onClick={handleSubmit}>{buttonProps?.submit?.text || '확인'}</Button>
      </div>
    </div>
  );
};

export default UserForm;
