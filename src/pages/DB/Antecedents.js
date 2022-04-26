import React,{ useState } from 'react'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import { Paper, makeStyles, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import useTable from '../../components/useTable'
import { TableBody } from '@mui/material'
import * as patientService from '../../services/patientService'
import * as antecedentService from '../../services/antecedentService'
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
    {id: 'id',label:'Id'},
    {id: 'libelle',label:'Libelle'},
    {id: 'actions',label:'Actions', disableSorting:true}
]

export default function Antecedents() {
    const classes = useStyles();
    const [records, setRecords] = useState(antecedentService.getAllPatients());
    const [filterFn, setFilterFn] = useState({fn:items =>{return items;}}); 
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
                    return items.filter(x =>x.libelle.includes(target.value))
            }
        })
    }

     const addOrEdit = (antecedent, resetForm) => {
        if(antecedent.id == 0)
            antecedentService.insertAntecedent(antecedent)
        else
            antecedentService.updateAntecedent(antecedent)
        resetForm()
        setRecords(antecedentService.getAllAntecedents())
         setNotify({
            isOpen: true,
            message: 'Enregistré avec succès',
            type: 'success'
        })
    }

     const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        antecedentService.deleteAntecedent(id);
        setRecords(antecedentService.getAllAntecedents())
        setNotify({
            isOpen: true,
            message: 'Supprimé avec succès',
            type: 'error'
        })
    }


  return (
    <>
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
                    /> 
                     { /*</Link>*/}
                 </Toolbar>
                 <TblContainer>
                     <TblHead/>
                     <TableBody>
                            { 
                            recordsAfterPagingAndSorting().map(item => 
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.libelle}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                        color="primary"
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
