import React from 'react'
import PatientForm from '../Patients/PatientForm'
import PageHeader from '../../components/PageHeader'
import { Storage } from '@mui/icons-material'
import { Paper, makeStyles, Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        marginTop: theme.spacing(1),
        padding: theme.spacing(3)
    }
}))

export default function Patients() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <PageHeader
                title="Base Donnees"
                icon={<Storage fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Antecedents" value="1" />
                                <Tab label="Examens" value="2" />
                                <Tab label="Bilan Medical" value="3" />
                                <Tab label="Medicaments" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Antecedents </TabPanel>
                        <TabPanel value="2">Examens </TabPanel>
                        <TabPanel value="3">Bilan Medical</TabPanel>
                        <TabPanel value="4">Medicaments</TabPanel>
                    </TabContext>
                </Box>
            </Paper>
        </>
    )
}
