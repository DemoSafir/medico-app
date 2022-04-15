import React from 'react'
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm'
import { FormLabel } from '@mui/material';
import Input from '../../components/controls/Input';

const sexeItems = [
    { id: 'homme', title: 'Homme' },
    { id: 'femme', title: 'Femme' },
]

const initialFValues = {
    cin: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    addresse: '',
    sexe: 'homme',
    dateNaissance: new Date(),
    mutuelle: '',
}
export default function PatientForm() {


    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues);

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        name="nom"
                        label="Nom"
                        value={values.nom}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="prenom"
                        label="Prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel>Sexe</FormLabel>
                    <RadioGroup row
                        name="sexe"
                        value={values.sexe}
                        onChange={handleInputChange}>
                        {sexeItems.map(item => (
                            <FormControlLabel value={item.id} control={<Radio />} label={item.title} />
                        ))}
                    </RadioGroup>
                </Grid>
            </Grid>
        </Form>
    )
}
