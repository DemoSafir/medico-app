import React,{ useEffect} from 'react'
import { Box, Grid, makeStyles, Paper, Tab } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls';
import * as patientService from '../../services/patientService';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PageHeader from '../../components/PageHeader';
import Header from '../../components/Header';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(0),
        padding: theme.spacing(2)
    }
}))

const sexeItems = [
    { id: 'homme', title: 'Homme' },
    { id: 'femme', title: 'Femme' },
]

const initialFValues = {
    id:0,       
    cin: '',
    nom: '',
    prenom: '',
    age:'',
    telephone: '',
    email: '',
    addresse: '',
    sexe: 'homme',
    dateNaissance: new Date(),
    mutuelle: '',
}
export default function PatientForm(props) {

    const { addOrEdit, recordForEdit } = props
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('cin' in fieldValues) 
        temp.cin =fieldValues.cin?"":"This field is required."
        if('nom' in fieldValues)
        temp.nom =fieldValues.nom?"":"This field is required."
        if('prenom' in fieldValues)
        temp.prenom =fieldValues.prenom?"":"This field is required."
        if('age' in fieldValues)
        temp.age =fieldValues.age>0?"":"This field is required."
        if('telephone' in fieldValues)
        temp.telephone =fieldValues.telephone.length>9?"":"Minimum 10 numbers required."
        if('email' in fieldValues)
        temp.email =((/$^|.+@.+..+/)).test(fieldValues.email)?"":"Email is not valid."
        if('addresse' in fieldValues)
        temp.addresse =fieldValues.addresse?"":"This field is required."
        if('mutuelle' in fieldValues)
        temp.mutuelle =fieldValues.mutuelle.length != 0?"":"This field is required."
        setErrors({
            ...temp
        })
        if(fieldValues == values)
        return Object.values(temp).every(x => x == "")
    }


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues,true,validate);

    const handleSubmit = e => {
        e.preventDefault();
         if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])


    return (
        <>
    {/* <Header />
        <PageHeader
                title="Nouveau Patient"
                subtitle="Conception de formulaire avec validation"
                icon={<PeopleOutlineIcon fontSize="large" /> }
        />*/}
        <Paper className={classes.pageContent}>
        <Box sx={{ width: '100%', typography: 'body1' }} className={classes.pageContent}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Informations Personnelles" value="1" />
                    </TabList>
                </Box>
            </TabContext>
        </Box>
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="cin"
                        label="CIN"
                        value={values.cin}
                        onChange={handleInputChange}
                        error={errors.cin}
                    />
                    <Controls.Input
                        name="nom"
                        label="Nom"
                        value={values.nom}
                        onChange={handleInputChange}
                        error={errors.nom}
                    />
                    <Controls.Input
                        name="prenom"
                        label="Prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                        error={errors.prenom}
                    />
                     <Controls.Input
                        name="age"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        error={errors.age}
                    />
                     <Controls.Input
                        name="telephone"
                        label="Telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                        error={errors.telephone}
                    />
                </Grid>
                <Grid item xs={6}>
                     <Controls.Input
                        name="addresse"
                        label="Addresse"
                        value={values.addresse}
                        onChange={handleInputChange}
                        error={errors.addresse}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
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
                            error={errors.mutuelle}
                    />
                    <div>
                        {/*<Link to="/" style={{textDecoration:"none"}}>*/}
                        <Controls.Button
                            type="submit"
                            text="Enregistrer"
                        />
                        {/*</Link>*/}
                        <Controls.Button
                            text="Annuler"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
        </Paper>
    </>
    )
}
