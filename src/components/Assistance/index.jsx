/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Card,
  Box,
  Alert,
  Typography,
  CardActionArea,
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../assets/logo/assistance.png';
import logoText from '../../logo_bar.png';

const Assistance = () => (
  <div>
    <Card sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px',
      marginTop: '150px',
      width: '100%',
      maxWidth: '800px',
    }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
      }}
      >
        <img style={{ height: '250px' }} src={logo} alt="cat-assistance" />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
      }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '50px',
        }}
        >
          <Typography variant="h5">Assistance</Typography>
          <img style={{ height: '50px', marginLeft: '15px' }} src={logoText} alt="" />
        </div>
        <Alert severity="info">
          Nous sommes désolés que vous ayez rencontré un problème sur notre plateforme.
          Pour nous contacter :
          {' '}
        </Alert>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Card
            sx={{
              marginTop: '50px',
              height: '120px',
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardActionArea
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
              }}
              href="https://waste-sentry.atlassian.net/servicedesk/customer/portal/1"
            >
              <SupportAgentIcon sx={{ fontSize: '50px' }} color="neutral" />
              <Typography sx={{
                fontSize: '15px', fontWeight: 'bold', color: '#646464', textAlign: 'center', marginTop: '10px',
              }}
              >
                Assistance
              </Typography>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              marginTop: '50px',
              height: '120px',
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardActionArea
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                width: '100%',
              }}
              href="mailto:support@waste-sentry.atlassian.net"
            >
              <EmailIcon sx={{ fontSize: '50px' }} color="neutral" />
              <Typography sx={{
                fontSize: '15px', fontWeight: 'bold', color: '#646464', textAlign: 'center', marginTop: '10px',
              }}
              >
                Mail
              </Typography>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Card>
  </div>
);

export default Assistance;
