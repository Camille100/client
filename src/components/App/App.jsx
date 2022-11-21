import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import Router from './Router';
import { store } from '../../redux/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AB3F21',
    },
    secondary: {
      main: '#2A2B2E',
    },
    neutral: {
      main: '#646464',
      contrastText: '#fff',
    },
    paleGreen: {
      main: '#81B19B',
      contrastText: '#fff',
    },
    paleYellow: {
      main: '#FFCB7D',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
  },
});

const App = () => (
  <Provider store={store}>
    <Container>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  </Provider>
);

export default App;
