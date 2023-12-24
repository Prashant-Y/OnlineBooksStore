import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddBooksMutation } from '../services/Query';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';
import MuiDatePicker from './datepicker';
import CustomAutocomplete from './autocomplete';
import RadioButtonGroup from './radiobutton';
import Text from '../components/textfield/index';
import FORM_VALIDATION from './formValidation/index';
import { colors } from '../styles/theme';
import { Form, Formik } from 'formik';
import AWS from 'aws-sdk'


const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: '950px',
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})


const StyledFormWrapper = styled('div')({
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '2rem',
  '@media (max-width: 450px)': {
    padding: '0rem',
  },
});

const StyledBox = styled(Box)(() => ({
  height: '150px',
  width: '150px',
  borderRadius: 10,
  backgroundColor: colors.lightGrey,
  border: `2px dashed ${colors.secondary}`,
  '&:hover': {
    cursor: 'pointer',
    border: `2px solid ${colors.secondary}`,
    transition: '3s ease-in-out',
  },
}));

const INITIAL_FORM_STATE = {
  title: '',
  publication_date: '',
  ISBN: '',
  genre: '',
  cover_image: '',
  summary: '',
  price: '',
  page_count: '',
  rating: '',
  author: '',
  edition: '',
  is_available: true,
  is_ebook_available: true,
};

const rating = Array.from({ length: 51 }, (_, index) => (index / 10).toFixed(1));

const genre = [
  'Action', 'Adventure', 'Biography', 'Children', 'Comedy', 'Crime', 'Drama',
  'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Science Fiction', 'Self-Help', 'Thriller',
];

export const AddBookForm = () => {
  const [addBooks] = useAddBooksMutation();
  const [previewImage, setPreviewImage] = useState(null);
  const [viewImage, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');
    
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // The result property contains the data as a Base64-encoded string
        const base64 = reader.result;
        setBase64String(base64);
        console.log(`Base64-encoded's`, base64);
      };

      // Read the image as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  // const s3 = new AWS.S3()

  const S3_BUCKET = 'hospital0000';
  const REGION = 'ap-south-1';
  AWS.config.update({
    accessKeyId: 'AKIAYYNHA3KRCS3XOZX5',
    secretAccessKey: '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',
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadFile = async () => {
    console.log("The file is ", file)

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
     }

    myBucket.putObject(params).promise()
      .then(data => { console.log('done', data); })
      .catch(err => { console.log('error', err); });
  }

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    // Changing file state
    setFile(file);
    const selectedFile = e.target.files[0];
   

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      
      console.log(file.name)

  
      // Read the image as a Data URL (Base64)
      setImage(imageUrl);
      setPreviewImage(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChooseLogoClick = () => {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  const handleRegister = async (values, { resetForm }) => {
    try {
      const imageUrl = await uploadFile();

      console.log(imageUrl + 'image url')
      let url = `https://hospital0000.s3.ap-south-1.amazonaws.com/${file.name}`;
      const updatedValues = { ...values, cover_image: url };

      const mutationResponse = await addBooks(updatedValues);
      console.log('Mutation Response:', mutationResponse);

      if (mutationResponse.error) {
        setError('Error adding book');
        return;
      }

      setPreviewImage('');
      setImage('');
      resetForm();
    } catch (error) {
      console.log('Error submitting form:', error);
      // setError('Error uploading file');
    }
  };


  return (
    <StyledFormWrapper>
      <StyledPaper elevation={3}>
        <h6>My project is under progress and this add book from will come under the admin flow and it is not ready yet thats why i have provided it here so that the main functionality will not left behind, i will enhance it in few days for proper roles</h6>
        <StyledTypography variant='h5' style={{ textAlign: 'center' }}>
          Add Book Form
        
        </StyledTypography>
        <Typography variant='h6' style={{ marginBottom: '1rem' }}>
          General Information
        </Typography>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleRegister}
        >

          {({ values, handleChange, handleBlur, touched }) => (
            <Form>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Text
                    name='title'
                    label='Title'
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

                <Grid item xs={12} sm={6}>
                  <Text
                    name='author'
                    label='Author name'
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


                <Grid item xs={12} sm={6}>
                  <MuiDatePicker
                    name='publication_date'
                    label='Publication Date'
                    autoComplete='off'
                    InputProps={{
                      style: {
                        background: 'white',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Text
                    name='ISBN'
                    label='ISBN Number'
                    autoComplete='off'
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    name="genre"
                    label="Genre"
                    options={genre}
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.genre}
                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <Text
                    name='price'
                    label='Price'
                    autoComplete='off'
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>


                <hr />

                <Grid item xs={12} sm={6}>
                  <Text
                    name='page_count'
                    label='Number of Pages'
                    autoComplete='off'
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    name="rating"
                    label="Rating"
                    options={rating}
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.rating}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <RadioButtonGroup
                    label="Available"
                    name="is_available"
                    options={[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ]}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Text
                    name='edition'
                    label='Edition'
                    autoComplete='off'
                    InputProps={{
                      style: {
                        background: 'white',
                        border: 'none',
                        borderRadius: '20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RadioButtonGroup
                    label="Ebook"
                    name="is_ebook_available"
                    options={[
                      { value: true, label: 'Available' },
                      { value: false, label: 'Not Available' },
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Text
                    name='summary'
                    label='Summary'
                    autoComplete='off'
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
                  <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                    Cover Image
                  </Typography>
                  <Box
                    onClick={handleChooseLogoClick}
                    sx={{
                      height: '150px',
                      width: '150px',
                      margin: '1rem 0rem',
                    }}
                  >
                    {previewImage ? (
                      <img
                        src={viewImage}
                        alt='Cover'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                    ) : (
                      <StyledBox
                        item
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Grid display='block'>
                          <CloudUploadIcon
                            sx={{
                              height: '35px',
                              color: colors.secondary,
                              position: 'relative',
                              left: '2rem',
                            }}
                          />
                          <StyledTypography variant='body2'>
                            Upload Image
                          </StyledTypography>
                        </Grid>
                      </StyledBox>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <VisuallyHiddenInput
                    id='logoInput'
                    type='file'
                    accept='image/*'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    container
                    justify='center'
                    alignItems='flex-end'
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </StyledFormWrapper>
  );
};


// from this code the image is uploaded to aws s3 bucket properly, but noe i want to send the image url to the api using the useAddBooksMutation. So ,provied this part of the code with proper work


// check this code properly
// and check that whether the data of form is coming properly and submitted properly as expected
// and check whether the image will be uploaded to AWS s3 properly through the code or not 