import React from 'react';
import {
BrowserRouter as Router,
Navigate,
Route,
Routes,
} from "react-router-dom";
import './App.css';
import SideMenu from '../components/SideMenu';
import { CssBaseline, makeStyles, createMuiTheme } from '@material-ui/core';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material';
import DB from '../pages/DB/DB';
import RendezVous from '../pages/RendezVous';

import Patients from '../pages/Patients/Patients';
import PatientForm from '../pages/Patients/PatientForm';

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
       {/* This is the alias of BrowserRouter i.e. Router */}
          <Router>
            <Routes>
           
            <Route
                    path="/"
                    element={ <Patients /> }
                />
      
            <Route
                    path="/PatientForm"
                    element={ <PatientForm /> }
                />
              
           
            <Route
                    path="/RendezVous"
                    element={ <RendezVous /> }
                />
              
            
            <Route
                    path="/"
                    element={ <Navigate to="/Patients" /> }
                />
            </Routes>
          </Router>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

