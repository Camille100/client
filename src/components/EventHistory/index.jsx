/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Card, Tabs, Tab, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import DeclaredEvents from './components/DeclaredEvents';
import SubscribedEvents from './components/SubscribedEvents';
import { getEventsByUser } from '../../services/eventServices';
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
  const [subscribedEvents, setSubscribedEvents] = useState([]);
  const [declaredEvents, setDeclaredEvents] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getEventsByUser(user.userId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setSubscribedEvents(res.data.subscribedEvents);
        setDeclaredEvents(res.data.declaredEvents);
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
        <Tab label="Evènements organisés" {...a11yProps(0)} />
        <Tab label="Participation évènements" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DeclaredEvents userId={user.userId} events={declaredEvents} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubscribedEvents userId={user.userId} events={subscribedEvents} />
      </TabPanel>
    </Card>
  );
};

export default DumpHistory;
