import React from 'react'
import PatientForm from './PatientForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Patients() {
    const classes = useStyles();
  return (
      <>
            <PageHeader
                title="Nouveau Patient"
                subtitle="Conception de formulaire avec validation"
                icon={<PeopleOutlineIcon fontSize="large" /> }
            />
            <Paper className={classes.pageContent}>
                  <PatientForm />
            </Paper>  
      </>
  )
}
