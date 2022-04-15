import React from 'react';
import './App.css';
import SideMenu from '../components/SideMenu';
import { CssBaseline, makeStyles, createMuiTheme } from '@material-ui/core';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material';
import DB from '../pages/DB/DB';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5'
    }, secondary: {
      main: '#9c27b0',
      light: '#ba68c8'
    }, background: {
      default: '#f4f5fd'
    },

    overrides: {
      MuiAppBar: {
        root: {
          transform: 'translateZ(0)'
        },
      }
    },
    props: {
      MuiIconButton: {
        disableRipple: true
      }
    }
  }
})



const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})



function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <DB />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
