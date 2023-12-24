import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@mui/material';
import { useField } from 'formik';

const RatingInput = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);

  const handleIncrement = () => {
    helpers.setValue(Math.min(field.value + 1, 5));
  };

  const handleDecrement = () => {
    helpers.setValue(Math.max(field.value - 1, 0));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" component="label" htmlFor={name}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Button variant="outlined" onClick={handleDecrement}>
          -
        </Button>
        <Typography variant="body1" component="span" style={{ margin: '0 8px' }}>
          {field.value}
        </Typography>
        <Button variant="outlined" onClick={handleIncrement}>
          +
        </Button>
        {meta.touched && meta.error && (
          <Typography variant="caption" color="error">
            {meta.error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

RatingInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RatingInput;