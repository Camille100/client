/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { CircularProgress, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getDumps, updateCleaningDemand } from '../../../services/dumpServices';
import Gallery from '../Dumps/components/Gallery';
import { openToast } from '../../../redux/slices/toastSlice';

const ValidateCleaning = () => {
  const [loading, setLoading] = useState(true);
  const [cleaningDemands, setCleaningDemands] = useState([]);
  const dispatch = useDispatch();

  const getCleaningDemands = () => {
    const demandsArr = [];
    getDumps().then((res) => {
      if (res.status === 200) {
        res.data.forEach((dump) => {
          if (dump.cleaningDemands && dump.cleaningDemands.length > 0) {
            dump.cleaningDemands.forEach((demand) => {
              if (demand.status === 'waiting') {
                demandsArr.push(demand);
              }
            });
          }
        });
        setCleaningDemands(demandsArr);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getCleaningDemands();
  }, []);

  const handleCleaningDemand = (e, status, demandObj) => {
    updateCleaningDemand(demandObj.demandId, { status, cleanerId: demandObj.cleanerId })
      .then((res) => {
        getCleaningDemands();
        if (res.status === 200) {
          dispatch(openToast({ message: 'Demande traitée avec succès', severity: 'success' }));
          return;
        }
        dispatch(openToast({ message: 'Problème dans le traitement de la demande', severity: 'error' }));
      });
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'cleaner',
      header: 'Nettoyeur ID',
    },
    {
      accessorKey: 'status',
      header: 'Statut',
    },
    {
      accessorKey: 'pictures',
      header: 'Photos',
      size: 300,
      accessorFn: (row) => (
        <div style={{ paddingLeft: '20px' }}>
          <Gallery pictures={row.pictures} />
        </div>
      ),
    },
    {
      accessorKey: 'validation',
      header: 'Validation',
      size: 300,
      accessorFn: (row) => (
        <div style={{ paddingLeft: '20px' }}>
          <Button
            color="paleGreen"
            variant="contained"
            onClick={(e) => handleCleaningDemand(e, 'accepted', { demandId: row._id, cleanerId: row.cleaner })}
          >
            Accepter
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: '15px' }}
            onClick={(e) => handleCleaningDemand(e, 'refused', { demandId: row._id, cleanerId: row.cleaner })}
          >
            Refuser
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <div style={{ width: '80vw', marginTop: '50px' }}>
      {loading
        ? <CircularProgress />
        : (
          <MaterialReactTable
            columns={columns}
            data={cleaningDemands}
            muiTableContainerProps={{
              sx: {
                minHeight: '500px',
              },
            }}
            enableColumnOrdering
            enableHiding
            initialState={{
              columnVisibility: {
                accessible: false, equipments: false, created_at: false, updated_at: false,
              },
            }}
          />
        )}
    </div>
  );
};

export default ValidateCleaning;
