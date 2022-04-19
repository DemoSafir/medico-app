import React from 'react';
import './App.css';
import SideMenu from '../components/SideMenu';
import { CssBaseline, makeStyles, createMuiTheme } from '@material-ui/core';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material';
import DB from '../pages/DB/DB';
import RendezVous from '../pages/RendezVous';

import Patients from '../pages/Patients/Patients';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    }, secondary: {
      main: '#f83245',
      light: '#f8324526'
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
        {/* <DB /> */}

        <RendezVous />
        {/* <Patients /> */}

      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
