import { FC } from 'react';
import { GridRowSelectionModel, GridRowsProp } from '@mui/x-data-grid';
import { CreateUser, DeleteUser } from '@/features/users/';

export interface ToolbarProps {
  selectedRows: GridRowSelectionModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
}

const Toolbar: FC<ToolbarProps> = ({ selectedRows, setRows }) => {
  return (
    <div className="flex gap-2 p-2">
      <CreateUser setRows={setRows} />
      <DeleteUser selectedRows={selectedRows} setRows={setRows} />
    </div>
  );
};

export default Toolbar;
