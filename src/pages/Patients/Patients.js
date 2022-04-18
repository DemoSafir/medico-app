import React,{ useState} from 'react'
import PatientForm from './PatientForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { Paper, makeStyles, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import useTable from '../../components/useTable'
import { TableBody } from '@mui/material'
import * as patientService from '../../services/patientService'
import Controls from '../../components/controls/Controls'
import { Search } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import Popup from '../../components/Popup'



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(1)
    },
    searchInput: {
        width:'75%'
    },
    newButton: {
        position:'absolute',
        right:'10px'
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
    {id: 'mutuelle',label:'Mutuelle',disableSorting:true},
]

export default function Patients() {
    const classes = useStyles();
    const [records, setRecords] = useState(patientService.getAllPatients());
    const [filterFn, setFilterFn] = useState({fn:items =>{return items;}}); 
    const [openPopup, setOpenPopup] = useState(false);

    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells,filterFn);

    const handelSearch = e => {
        let target = e.target;
        setFilterFn({
            fn:items => {
                if(target.value == "")
                    return items;   
                    else
                    return items.filter(x =>x.cin.toLowerCase.includes(target.value))
            }
        })
    }


  return (
      <>
            <PageHeader
                title="Nouveau Patient"
                subtitle="Conception de formulaire avec validation"
                icon={<PeopleOutlineIcon fontSize="large" /> }
            />
            <Paper className={classes.pageContent}>
                {/*<PatientForm />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.searchInput}
                        label="Search Patients"
                        InputProps={{
                            startAdornment:(<InputAdornment position="start">
                                        <Search />
                            </InputAdornment>)
                        }}
                        onChange={handelSearch}
                    />
                    <Controls.Button 
                        text= "Ajouter"
                        variant="outlined"
                        startIcon={<AddIcon />  }
                        className={classes.newButton}
                        
                    /> 
                 </Toolbar>
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
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            </Popup>  
      </>
  )
}
