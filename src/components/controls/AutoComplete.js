import * as React from 'react';
// import TextField from '@mui/material/TextField';
import TextField from '../controls/Input';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


const filter = createFilterOptions();

export default function AutoComplete(props) {
    const { name, label, value, values, setValues, options, newPatient } = { ...props }
    return (
        <Autocomplete
            name={name}
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValues({ ...values, [name]: newValue.title })
                }
                else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValues({ ...values, [name]: newValue.inputValue })
                    newPatient(newValue.inputValue)
                }
                else {
                    setValues({ ...values, [name]: newValue.title })
                }
            }}

            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys

            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label={label} />}
        />

    );
}