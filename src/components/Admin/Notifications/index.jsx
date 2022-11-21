/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Tooltip,
  IconButton,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getNotifications, updateNotification, deleteNotification } from '../../../services/notificationServices';
import Warning from '../ReusableComponents/Warning';

const AdminNotifications = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);
  const [tableRow, setTableRow] = useState({});

  const columns = useMemo(() => [
    {
      accessorKey: '_id',
      header: 'Notification ID',
    },
    {
      accessorKey: 'content',
      header: 'Contenu',
    },
    {
      accessorKey: 'seen',
      header: 'Vue',
    },
    {
      accessorKey: 'idUser',
      header: 'Utilisateur cible',
    },
    {
      accessorKey: 'idDump',
      header: 'Décharge ID',
    },
    {
      accessorKey: 'idEvent',
      header: 'Evènement ID',
    },
    {
      accessorKey: 'idInvite',
      header: 'Invitation ID',
    },
    {
      accessorKey: 'created_at',
      header: 'Créé le',
    },
    {
      accessorKey: 'updated_at',
      header: 'Mis à jour le',
    },
  ], []);

  useEffect(() => {
    getNotifications().then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    data[row.index] = values;
    // send/receive api updates here, then refetch or update local table data for re-render
    setData([...data]);
    exitEditingMode(); // required to exit editing mode and close modal
  };

  useEffect(() => {
    if (validate) {
      // send api delete request here, then refetch or update local table data for re-render
      data.splice(tableRow.index, 1);
      setData([...data]);
      setValidate(false);
    }
  }, [validate]);

  const handleDeleteRow = (row) => {
    console.log(row);
    setTableRow(row);
    setOpen(true);
  };

  if (!loading) {
    return (
      <div style={{ width: '80vw', marginTop: '50px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Notifications</Typography>
        <MaterialReactTable
          columns={columns}
          data={data}
          muiTableContainerProps={{
            sx: {
              minHeight: '500px',
            },
          }}
          enableRowActions
          editingMode="modal" // default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
        <Warning
          open={open}
          setOpen={setOpen}
          setValidate={setValidate}
        />
      </div>
    );
  }
  return <CircularProgress />;
};

export default AdminNotifications;
