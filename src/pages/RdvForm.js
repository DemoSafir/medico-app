import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../components/useForm'
import Controls from '../components/controls/Controls';
import * as patientService from '../services/patientService';
import axios from 'axios';
// SnackBar
import SnackBar from '../components/SnackBar.js'
import AutoComplete from '../components/controls/AutoComplete';

const typeRdvItems = [
    { id: 'CONSULTATION', title: 'Consultation' },
    { id: 'CONTROLE', title: 'Controle' },
]



const initialFValues = {
    patientCin: '',
    typeRdv: '',
    motifRdv: '',
    heureDebut: null,
    heureFin: null,

}
export default function RdvForm(props) {

    const { eventDate, eventId, setEventId, openPopup } = { ...props }
    initialFValues.heureDebut = eventDate
    initialFValues.heureFin = eventDate

    // SnackBar
    const [severity, setSeverity] = React.useState('');
    const [submitResponse, setSubmitResponse] = React.useState('');
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const [patientItems, setPatientItems] = React.useState([]);
    const [newPatient, setNewPatient] = React.useState(false);


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        // if ('fullName' in fieldValues)
        //     temp.fullName = fieldValues.fullName ? "" : "This field is required."
        // validation
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const rendezVous = {
                ...values
            }
            // 🔗 Axios
            if (!eventId) {
                axios.post(`http://localhost:8080/api/v1/rendezVous/nouveau`, { ...rendezVous })
                    .then(res => {
                        setSubmitResponse(JSON.parse(JSON.stringify(res.data)).msg)
                        setSeverity('success')
                        setOpenSnackBar(true)
                    }).catch(err => {
                        setSubmitResponse(err.response.data.msg)
                        setSeverity('error')
                        setOpenSnackBar(true)
                    })
            } else {
                axios.put(`http://localhost:8080/api/v1/rendezVous/${eventId}`, { ...rendezVous })
                    .then(res => {
                        setSubmitResponse(JSON.parse(JSON.stringify(res.data)).msg)
                        setSeverity('success')
                        setOpenSnackBar(true)
                    }).catch(err => {
                        setSubmitResponse(err.response.data.msg)
                        setSeverity('error')
                        setOpenSnackBar(true)
                    })
            }
        }
    }



    // 🆕 new patient
    const handleNewPatient = (cin) => {
        axios.post(`http://localhost:8080/api/v1/patients/nouveau`, { cin })
            .then(res => {
                setNewPatient(true)
                setSubmitResponse(JSON.parse(JSON.stringify(res.data)).msg)
                setSeverity('success')
                setOpenSnackBar(true)
            }).catch(err => {
                setSubmitResponse(err.response.data.msg)
                setSeverity('error')
                setOpenSnackBar(true)
            })
    }

    useEffect(() => {
        // Load patients
        axios.get(`http://localhost:8080/api/v1/patients`)
            .then(res => {
                const temps = []
                res.data.map(e => {
                    const temp = {}
                    temp.title = e.cin;
                    temps.push(temp)
                })
                setPatientItems(temps)
            })
    }, [newPatient])

    // Load Event
    useEffect(() => {
        if (eventId && openPopup) {
            setEventId(eventId)
            axios.get(`http://localhost:8080/api/v1/rendezVous/${eventId}`)
                .then(res => {
                    setValues({ ...res.data })
                }).catch(err => {
                    setSubmitResponse(err.response.data.msg)
                    setSeverity('error')
                    setOpenSnackBar(true)
                })
        } else {
            setEventId(null)
        }
    }, [openPopup])


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <AutoComplete
                            name="patientCin"
                            label="Patient"
                            value={values.patientCin}
                            values={values}
                            setValues={setValues}
                            options={patientItems}
                            newPatient={handleNewPatient}
                        />
                        <Controls.Select
                            name="typeRdv"
                            label="Type"
                            value={values.typeRdv}
                            onChange={handleInputChange}
                            options={typeRdvItems}
                        />
                        <Controls.Input
                            name="motifRdv"
                            label="Motif"
                            value={values.motifRdv}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.DateTimePicker
                            name="heureDebut"
                            label="Debut"
                            value={values.heureDebut}
                            onChange={handleInputChange}
                        />
                        <Controls.DateTimePicker
                            name="heureFin"
                            label="Fin"
                            value={values.heureFin}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <div style={{ marginTop: "2rem" }}>
                        <Controls.Button
                            type="submit"
                            text="Enregistrer"
                        />
                        <Controls.Button
                            text="Annuler"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid >
            </Form>
            <SnackBar
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
                severity={severity}
                text={submitResponse}
            />
        </>
    )
}
