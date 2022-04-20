import React,{ useState } from 'react'
import PatientForm from './PatientForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { Paper, makeStyles, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import useTable from '../../components/useTable'
import { TableBody } from '@mui/material'
import * as patientService from '../../services/patientService'
import Controls from '../../components/controls/Controls'
import { Search } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import Popup from '../../components/Popup'
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import Header from '../../components/Header'



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
    {id: 'sexe',label:'Sexe'},
    {id: 'mutuelle',label:'Mutuelle'},
    {id: 'actions',label:'Actions', disableSorting:true}
]

export default function Patients() {
    const classes = useStyles();
    const [records, setRecords] = useState(patientService.getAllPatients());
    const [filterFn, setFilterFn] = useState({fn:items =>{return items;}}); 
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

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
                    return items.filter(x =>x.cin.includes(target.value))
            }
        })
    }

    const addOrEdit = (patient, resetForm) => {
        if(patient.id == 0)
            patientService.insertPatient(patient)
        else
            patientService.updatePatient(patient)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(patientService.getAllPatients())
         setNotify({
            isOpen: true,
            message: 'Enregistré avec succès',
            type: 'success'
        })
    }

    const openInPopup = item =>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        patientService.deletePatient(id);
        setRecords(patientService.getAllPatients())
        setNotify({
            isOpen: true,
            message: 'Supprimé avec succès',
            type: 'error'
        })
    }

    return (
        <>
            <Header />
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
                   { /* <Link to="/PatientForm">*/}
                    <Controls.Button 
                        text= "Ajouter"
                        variant="outlined"
                        startIcon={<AddIcon />  }
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true);setRecordForEdit(null);}}
                    /> 
                     { /*</Link>*/}
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
                                    <TableCell>{item.sexe}</TableCell>
                                    <TableCell>{item.mutuelle}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                        color="primary"
                                        onClick={() => {openInPopup(item)}}
                                        >
                                            <ModeEditOutlineIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Voulez-vous vraiment supprimer cet enregistrement ?',
                                                    subTitle: "Vous ne pouvez pas annuler cette opération",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
           <Popup
                title="Nouveau Patient"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            <PatientForm 
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            />
            </Popup> 
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
      </>
  )
}
