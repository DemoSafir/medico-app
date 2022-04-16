import * as React from 'react';
import PageHeader from '../components/PageHeader'
import { CalendarMonth } from '@mui/icons-material'
import { Paper, makeStyles } from '@material-ui/core'
// modal
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { BootstrapDialog, BootstrapDialogTitle } from '../components/BootstrapDialog'
// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))

const events = [
    {
        id: 1,
        title: 'event 1',
        start: '2021-06-14T10:00:00',
        end: '2021-06-14T12:00:00',
    },
    {
        id: 2,
        title: 'event 2',
        start: '2021-06-16T13:00:00',
        end: '2021-06-16T18:00:00',
    },
];


function RendezVous() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [eventDate, setEventDate] = React.useState();

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddEvent = (e) => {
        setOpen(true)
        setEventDate(e.dateStr)
    }

    const handleSelectRange = (e) => {
        // setOpen(true)
        // setEventDate(e.dateStr)
    }
    return (
        <>
            <PageHeader
                title="Rendez-Vous"
                icon={<CalendarMonth fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <FullCalendar
                    weekends
                    editable
                    droppable
                    selectable
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}

                    events={events}
                    nowIndicator
                    dateClick={handleAddEvent}
                    eventClick={(e) => prompt(e.event.id)}
                    select={handleSelectRange}
                />
            </Paper>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Ajouter Rendez-Vous
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Selected date is {eventDate}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant='contained' color='success' style={{ color: 'white' }} onClick={handleClose} autoFocus>
                        Enregistrer
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>

    );
}

export default RendezVous