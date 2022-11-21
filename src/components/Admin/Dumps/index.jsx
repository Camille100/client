/* eslint-disable react/prop-types */
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
import { getDumps, updateDump, deleteDump } from '../../../services/dumpServices';
import Warning from '../ReusableComponents/Warning';

const AdminDump = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);
  const [tableRow, setTableRow] = useState({});

  const columns = useMemo(() => [
    {
      accessorKey: 'creator',
      header: 'Créateur',
    },
    {
      accessorKey: 'comment',
      header: 'Description',
    },
    {
      accessorKey: 'status',
      header: 'Statut',
    },
    {
      accessorKey: 'equipments',
      header: 'Equipements',
      accessorFn: (row) => (
        <div style={{ display: 'flex', fexDirection: 'column', alignItems: 'flex-start' }}>
          {row.equipments.map((equipment) => (
            <Typography variant="subtitle">{equipment.name}</Typography>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'accessible',
      header: 'Accessibilité',
      accessorFn: (row) => (
        <div style={{ display: 'flex', fexDirection: 'column', alignItems: 'flex-start' }}>
          {row.accessible.onFoot && <Typography variant="subtitle">Accessible à pieds</Typography>}
          {row.accessible.onCar && <Typography variant="subtitle">Accessible en voiture</Typography>}
        </div>
      ),
    },
    {
      accessorKey: 'location.type',
      header: 'Coordonnées',
    },
    {
      accessorKey: 'pictures',
      header: 'Images',
      accessorFn: (row) => (
        <div style={{ display: 'flex', fexDirection: 'column', alignItems: 'flex-start' }}>
          {row.pictures.map((url, index) => (
            <img src={url} alt={`décharge ${index}`} style={{ height: '30px', width: '30px' }} />
          ))}
        </div>
      ),
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
    getDumps().then((res) => {
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
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Décharges</Typography>
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

export default AdminDump;
