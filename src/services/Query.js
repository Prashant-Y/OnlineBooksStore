import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import {toast} from 'react-toastify'

export const queries = createApi({
    reducerPath:'queries',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://book-management-system-omega.vercel.app/api/',
        prepareHeaders: (headers) => {
         const userData =JSON.parse(localStorage.getItem('userdetail'))
         if (userData?.data?.token.access) {
            headers.set('Authorization', `Bearer ${userData?.data.token.access}`)
         }
         return headers
      }
    }),

    
   keepUnusedDataFor: 5,
   refetchOnReconnect: true,
   refetchOnFocus: true,
   tagTypes:["BOOK", "LOGIN"],

   endpoints: build=>({
    addBooks: build.mutation({
        query: (value) => ({
         url: 'book/add/',
           method: 'POST',
           body:value
        }),      
     }),
     addAddress: build.mutation({
      query: (value) => ({
         url: '/address/add/',
         method: 'POST',
         body:value
      }),      
   }),
     userSignup: build.mutation({
        query: (value) => ({
           url: 'user/register/',
           method: 'POST',
           body:value
        }),
       
     }),
     userLogin: build.mutation({
        query: (value) => ({
           url: 'user/login/',
           method: 'POST',
           body:value
        }),
       
     }),
     bookCartDelete: build.mutation({
      query: (value) => ({
         url: `cart/delete/${value}/`,
         method: 'DELETE',
      }),
     
   }),
     getBooks: build.query({
        query: () => ({
           url: 'book/view/',
           method: 'GET',
         }),
     }),
     viewCart: build.query({
      query: () =>{
         const userData =JSON.parse(localStorage.getItem('userdetail'))
         return ({
         url: `cart/view/${userData?.data?.user_id}`,
         method: 'GET',
       })},
   }),
     getBookDetails: build.query({
      query: (bookId) => ({
         url: `/book/view/${bookId}/?book_id=${bookId}`,
         method: 'GET',
       }),
   }),
   addToCart: build.mutation({
      query: (value) => {
         localStorage.getItem('')
         return({
         url: '/cart/add/',
         method: 'POST',
         body:value
      })},
     
   }),
   })
 

})

export const {
    useAddBooksMutation,
    useGetBooksQuery,
    useUserLoginMutation,
    useUserSignupMutation,
    useGetBookDetailsQuery,
    useAddToCartMutation,
    useViewCartQuery,
    useAddAddressMutation,
    useBookCartDeleteMutation
} = queries

