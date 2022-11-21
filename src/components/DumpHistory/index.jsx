/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Card, Tabs, Tab, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import SignaledDumps from './components/SignaledDumps';
import CleanedDumps from './components/CleanedDumps';
import { getDumpsByUser } from '../../services/dumpServices';
import { openToast } from '../../redux/slices/toastSlice';

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const DumpHistory = () => {
  const [value, setValue] = useState(0);
  const [signaledDumps, setSignaledDumps] = useState([]);
  const [cleanedDumps, setCleanedDumps] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getDumpsByUser(user.userId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setCleanedDumps(res.data.cleanedDumps);
        setSignaledDumps(res.data.signaledDumps);
        return;
      }
      dispatch(openToast({ message: 'Récupération des décharges échouée', severity: 'error' }));
    });
  }, []);

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Décharges déclarées" {...a11yProps(0)} />
        <Tab label="Décharges nettoyées" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SignaledDumps userId={user.userId} dumps={signaledDumps} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CleanedDumps userId={user.userId} dumps={cleanedDumps} />
      </TabPanel>
    </Card>
  );
};

export default DumpHistory;
