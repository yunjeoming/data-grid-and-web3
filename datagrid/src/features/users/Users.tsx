'use client';

import { useCallback, useState } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowSelectionModel,
  GridRowId,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { UpdateUser, Toolbar } from '@/features/users/';

export default function Users({ data }: { data: GridRowsProp }) {
  const [rows, setRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedUser, setSelectedUser] = useState<GridValidRowModel | null>(null);

  const handleClickUser = useCallback(
    (id: GridRowId) => {
      const targetUser = rows.find((row) => row.id === id);
      targetUser && setSelectedUser(targetUser);
    },
    [rows]
  );

  const setInitSelectedUser = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      type: 'string',
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: 'createdAt',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      width: 50,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={'update'}
            icon={<LaunchIcon fontSize="small" />}
            label="update"
            onClick={() => handleClickUser(id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataGrid
        className="w-full"
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
        onRowSelectionModelChange={setSelectedRows}
        disableRowSelectionOnClick
        checkboxSelection
        slots={{
          toolbar: Toolbar,
        }}
        slotProps={{
          toolbar: { selectedRows, setRows },
        }}
      />
      <UpdateUser userInfo={selectedUser} setRows={setRows} setInitSelectedUser={setInitSelectedUser} />
    </>
  );
}
