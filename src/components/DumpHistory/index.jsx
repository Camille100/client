/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Card, Tabs, Tab, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SignaledDumps from './components/SignaledDumps';
import CleanedDumps from './components/CleanedDumps';
import { getDumpsByUser } from '../../services/dumpServices';

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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getDumpsByUser(user.userId).then((res) => console.log(res));
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
        <SignaledDumps userId={user.userId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CleanedDumps userId={user.userId} />
      </TabPanel>
    </Card>
  );
};

export default DumpHistory;
