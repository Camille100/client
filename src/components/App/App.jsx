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
  typography: {
    // fontFamily: 'Noto Sans, sans-serif',
  },
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
      dark: '#494949',
    },
    paleGreen: {
      main: '#81B19B',
      contrastText: '#fff',
      dark: '#6B9380',
    },
    paleYellow: {
      main: '#FFCB7D',
      contrastText: '#fff',
      dark: '#C9A164',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&.Mui-disabled': {
            borderBottom: '0px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiInput-root.Mui-disabled': {
            ':before': {
              borderBottomStyle: 'none',
            },
          },
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
