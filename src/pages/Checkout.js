import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Text from '../components/textfield'
import { Form, Formik } from 'formik'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { colors } from '../styles/theme'
import FORM_VALIDATION, { checkoutFormValidation } from '../components/formValidation'
import { useAddAddressMutation } from '../services/Query'
import { useNavigate } from 'react-router-dom';
import { path } from '../App';

const StyledFormWrapper = styled('div')({
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem',
    '@media (max-width: 450px)': {
      padding: '0rem',
    },
  });
  
  const StyledPaper = styled(Paper)(({ theme }) => ({
    maxWidth: '600px', // Decreased the width
    boxShadow: theme.shadows[3],
    backgroundColor: colors.background,
    borderRadius: '20px',
    padding: '2rem',
  }));
  
  const StyledTypography = styled(Typography)(() => ({
    fontWeight: 'bold',
    paddingBottom: '1rem',
    color: colors.primary,
  }));
  
  const StyledForm = styled(Form)({
    width: '100%',
  });
  
  const StyledSubmitButton = styled(Button)(({ theme }) => ({
    marginTop: '1rem',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  }));
  
  function Checkout() {
    const [addaddress,{isSuccess,isLoading}] = useAddAddressMutation();
    const [error, setError] = useState(null);
  
    const INITIAL_FORM_STATE = {
      city: '',
      pincode: '',
      state: '',
      country: '',
      address: '',
      address_type:'Home'
      
    };
    const navigate=useNavigate()

    useEffect(()=>{
      if(isSuccess){
        navigate(path.home)
      }
    },[isSuccess])
  
    const handleRegister = async (values, { resetForm }) => {
        try {
          console.log('Form Values:', values);
      
          const mutationResponse = await addaddress(values);
          console.log('Mutation Response:', mutationResponse);
      
          // Check for a specific success condition, adjust this based on your API response
          if (mutationResponse.status === 'success') {
            console.log('Data posted successfully');
            resetForm();
          } else {
            console.error('Error adding book:', mutationResponse.error);
            setError('Error adding book');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setError('Error adding book');
        }
      };
      
    return (
  
    <StyledFormWrapper>
      <StyledPaper elevation={3}>
        <StyledTypography variant='h5' style={{ textAlign: 'center' }}>
          Checkout Form
        </StyledTypography>
      
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={checkoutFormValidation}
          onSubmit={handleRegister}
        >

          {({ values, handleChange, handleBlur, touched }) => (
            <Form>
            

              <Grid container spacing={2}>
                <Grid item xs={12}  >
                  <Text
                    name='city'
                    label='City Name'
                    autoComplete=''
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Text
                    name='pincode'
                    label='Pincode'
                    autoComplete=''
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Text
                    name='state'
                    label='State Name'
                    autoComplete=''
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Text
                    name='country'
                    label='Country Name'
                    autoComplete=''
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Text
                    name='address'
                    label='Address'
                    autoComplete=''
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledSubmitButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                   { isLoading?'Loading...':"Submit"}
                  </StyledSubmitButton>
                </Grid>
               </Grid>
 
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </StyledFormWrapper>
  )
}

export default Checkout
