/* eslint-disable no-underscore-dangle */
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
  List,
  ListItem,
  Divider,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  Paper,
  Alert,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getDumps, updateDump, deleteDump } from '../../../services/dumpServices';
import Warning from '../ReusableComponents/Warning';
import Gallery from './components/Gallery';

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
        <List>
          {row.equipments.map((equipment) => (
            <ListItem>{equipment.name}</ListItem>
          ))}
        </List>
      ),
    },
    {
      accessorKey: 'accessible',
      header: 'Accessibilité',
      accessorFn: (row) => (
        <List style={{ display: 'flex', fexDirection: 'column', alignItems: 'flex-start' }}>
          {row.accessible.onFoot && <ListItem variant="subtitle">Accessible à pieds</ListItem>}
          {row.accessible.onCar && <ListItem variant="subtitle">Accessible en voiture</ListItem>}
        </List>
      ),
    },
    {
      accessorKey: 'location.type',
      header: 'Coordonnées',
    },
    {
      accessorKey: 'pictures',
      header: 'Images',
      size: 300,
      accessorFn: (row) => (
        <div style={{ paddingLeft: '20px' }}>
          <Gallery pictures={row.pictures} height="200px" width="200px" />
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
          enableHiding
          initialState={{
            columnVisibility: {
              accessible: false, equipments: false, created_at: false, updated_at: false,
            },
          }}
          onEditingRowSave={handleSaveRowEdits}
          renderDetailPanel={({ row }) => (
            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '1000px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Nettoyeur ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Photos
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Statut
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.original.cleaningDemands && row.original.cleaningDemands.length > 0
                    ? row.original.cleaningDemands.map((demand) => (
                      <TableRow>
                        <TableCell>
                          {demand.cleaner}
                        </TableCell>
                        <TableCell>
                          <Gallery pictures={demand.pictures} height="200px" width="200px" />
                        </TableCell>
                        <TableCell>
                          {demand.status === 'waiting' && <Alert severity="warning">En attente</Alert>}
                          {demand.status === 'accepted' && <Alert severity="success">Accepté</Alert>}
                          {demand.status === 'refused' && <Alert severity="error">Refusé</Alert>}
                        </TableCell>
                      </TableRow>
                    ))
                    : (
                      <>
                        <Typography>Pas de demandes de nettoyage</Typography>
                        <Divider />
                      </>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
