// MuiDatePicker.js

import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const MuiDatePicker = ({ name, label, autoComplete, InputProps, ...rest }) => {
   // Use useField to access formik field props
   const [field, meta] = useField(name);

   // Helper function to handle date changes and set form field value
   const handleDateChange = (event) => {
      const { value } = event.target;
      field.onChange(event);
      field.onBlur(event);
   };

   return (
      <TextField
         type="date"
         id={name}
         name={name}
         label={label}
         autoComplete={autoComplete}
         variant="outlined"
         fullWidth
         error={meta.touched && Boolean(meta.error)}
         helperText={meta.touched && meta.error}
         InputLabelProps={{
            shrink: true,
         }}
         InputProps={{
            style: {
               borderRadius: '20px',
               ...InputProps?.style,
            },
         }}
         onChange={handleDateChange}
         {...field}
         {...rest}
      />
   );
};

export default MuiDatePicker;
