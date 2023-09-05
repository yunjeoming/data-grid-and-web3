import React, { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

const TextInput: FC<Props> = ({ labelText, type, id, name, placeholder, onChange, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id || labelText} className="text-sm text-gray-500">
        {labelText}
      </label>
      <input
        type={type}
        id={id || labelText}
        name={name || labelText}
        className="border p-2 pl-2 focus:outline-none focus:border-[#1976D2] rounded-md"
        placeholder={placeholder}
        onChange={onChange}
        value={value ?? ''}
      />
    </div>
  );
};

export default TextInput;
