import React,{ useState} from 'react'
import PatientForm from './PatientForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { Paper, makeStyles, TableRow, TableCell } from '@material-ui/core'
import useTable from '../../components/useTable'
import { TableBody } from '@mui/material'
import * as patientService from '../../services/patientService'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(1)
    }
}))

const headCells = [
    {id: 'cin',label:'CIN'},
    {id: 'nom',label:'Nom'},
    {id: 'prenom',label:'Prenom'},
    {id: 'age',label:'Age'},
    {id: 'telephone',label:'Telephone'},
    {id: 'email',label:'Email'},
    {id: 'sexe',label:'Sexe'},
    {id: 'mutuelle',label:'Mutuelle'},
]

export default function Patients() {
    const classes = useStyles();
    const [records, setRecords] = useState(patientService.getAllPatients());
   
    
    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells);

  return (
      <>
            <PageHeader
                title="Nouveau Patient"
                subtitle="Conception de formulaire avec validation"
                icon={<PeopleOutlineIcon fontSize="large" /> }
            />
            <Paper className={classes.pageContent}>
                 {/*<PatientForm />*/}
                 <TblContainer>
                     <TblHead/>
                     <TableBody>
                            { 
                            recordsAfterPagingAndSorting().map(item => 
                                (<TableRow key={item.id}>
                                    <TableCell>{item.cin}</TableCell>
                                    <TableCell>{item.nom}</TableCell>
                                    <TableCell>{item.prenom}</TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>{item.telephone}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.sexe}</TableCell>
                                    <TableCell>{item.mutuelle}</TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>  
      </>
  )
}
