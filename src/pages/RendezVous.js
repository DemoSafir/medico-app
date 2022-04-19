import * as React from 'react';
import PageHeader from '../components/PageHeader'
import { CalendarMonth } from '@mui/icons-material'
import { Paper, makeStyles } from '@material-ui/core'
// popUp
import Popup from '../components/Popup';
import RdvForm from './RdvForm'
// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))



function RendezVous() {
    const classes = useStyles();
    const [events, setEvents] = React.useState([]);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [eventDate, setEventDate] = React.useState();
    const [eventId, setEventId] = React.useState(null);

    const handleClose = () => {
        setOpenPopup(false);
    };

    const handleAddEvent = (e) => {
        setOpenPopup(true)
        setEventDate(e.date)
    }
    const handleEditEvent = (e) => {
        setOpenPopup(true)
        setEventId(e.event.id)
    }

    const handleSelectRange = (e) => {
        // setOpen(true)
        // setEventDate(e.dateStr)
    }

    // Load Events
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/rendezVous/`)
            .then(res => {
                const temps = []
                res.data.map(e => {
                    const temp = {}
                    temp.id = e.idRdv;
                    temp.title = e.motifRdv;
                    temp.start = e.heureDebut;
                    temp.end = e.heureFin;
                    temps.push(temp)
                })
                setEvents(temps)
            })
    }, [openPopup])
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
                    eventColor="#f50057"
                    events={events}
                    nowIndicator
                    dateClick={handleAddEvent}
                    eventClick={handleEditEvent}
                    select={handleSelectRange}
                />
            </Paper>

            <Popup
                title="Rendez Vous"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <RdvForm
                    eventDate={eventDate}
                    eventId={eventId}
                    setEventId={setEventId}
                    openPopup={openPopup}
                ></RdvForm>
            </Popup>
        </>

    );
}

export default RendezVous