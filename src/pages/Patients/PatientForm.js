import React from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls';
import * as patientService from '../../services/patientService';

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
                    <Controls.Input
                        name="cin"
                        label="CIN"
                        value={values.cin}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="nom"
                        label="Nom"
                        value={values.nom}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="prenom"
                        label="Prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                    />
                     <Controls.Input
                        name="telephone"
                        label="Telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                    />
                     <Controls.Input
                        name="addresse"
                        label="Addresse"
                        value={values.addresse}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                            name="sexe"
                            label="Sexe"
                            value={values.sexe}
                            onChange={handleInputChange}
                            items={sexeItems}
                    />
                    <Controls.DatePicker
                            name="dateNaissance"
                            label="Date Naissance"
                            value={values.dateNaissance}
                            onChange={handleInputChange}
                    />
                    <Controls.Select
                            name="mutuelle"
                            label="Mutuelle"
                            value={values.mutuelle}
                            onChange={handleInputChange}
                            options={patientService.getMutuelleCollection()}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Enregistrer"
                        />
                        <Controls.Button
                            text="Annuler"
                            color="default"
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
