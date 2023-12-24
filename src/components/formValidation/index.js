// formValidation.js
import * as Yup from 'yup';

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string()
    // .matches(/^[a-zA-Z\s]*$/, 'Invalid name')
    .required('Required!'),

    author: Yup.string()
    // .matches(/^[a-zA-Z\s]*$/, 'Invalid name')
    .required('Required!'),


    publication_date: Yup.string()
    .required('Required!'),


     ISBN: Yup.string()
    .matches(/^\d{3}-?\d{10}$/)
    .required('ISBN is required'),


    genre: Yup.string().required('Genre is required!'),


    summary: Yup.string().required('Required!'),

    price: Yup.number()
    .required('Please provide the price')
    .typeError('Please enter a valid number')
    .positive('Please enter a positive number')
    .min(0.01, 'Price must be greater than 0')
    .max(999999, 'Price is too high. Please enter a valid amount'),

    page_count: Yup.number()
    .required('Please provide the page size')
    .typeError('Please enter a valid number')
    .integer('Page count must be a whole number')
    .positive('Please enter a positive number')
    .min(1, 'Page count must be at least 1'),

    rating: Yup.string().required('Please provide the rating'),

    edition: Yup.number()
    .required('Please provide the edition')
    .typeError('Please enter a valid number')
    .positive('Please enter a positive number')
    .min(0.01, 'Invalid edition')
    .max(999, 'edition is too high. Please enter a valid edition'),

    
   
});

export const checkoutFormValidation=Yup.object().shape({ city: Yup.string().required('City is required'),
pincode: Yup.string().required('Pincode is required'),
state: Yup.string().required('State is required'),
country: Yup.string().required('Country is required'),
address: Yup.string().required('Address is required'),})

export default FORM_VALIDATION;

// password should contains an special character this special character will be all that comes under it officially