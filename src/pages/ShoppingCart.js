import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { useBookCartDeleteMutation, useGetBookDetailsQuery, useViewCartQuery } from '../services/Query';
import { useNavigate } from 'react-router-dom';
import { path } from '../App';
// import {CheckOutForm} from './CheckOutForm';

<></>
function ShoppingCart(cart, onCheckout) {
  const carts = localStorage.getItem("bookCart");

  const { data: cartDatas, isSuccess } = useViewCartQuery()
  const [bookDelete]=useBookCartDeleteMutation()

  useEffect(() => {
    if (isSuccess) {
      // const booksIdArray=cartDatas?.data.map((item)=>item.book_id)
      console.log(cartDatas, 'bookIdArray')
      // booksIdArray?.map(((bookid)=>getBookDetails(bookid)))
    }

  }, [isSuccess])

  const handleDelete =async(value)=>{
    await bookDelete(value)
  }

  const navigate=useNavigate()

  const handlecheckout=()=>{
    navigate(path.checkout)
  }


  // const [cartData,setCartData] = useState(cart);
  // if(carts) {
  //     let mainCarts = JSON.parse(carts);
  //     console.log(mainCarts);
  //     console.log("show the carts on shopping cart ======================")
  // }
  // const [totalCartState,setTotalCartState] = useState();
  // let total = 0;
  // useEffect(() => {
  //     cartDatas?.data?.forEach((value) => {
  //         total += value.price;
  //     });
  //     setTotalCartState(total);
  // },[isSuccess]);

  return (
    <div>
      <div
        
        className=" border border-3 mx-0  w-100   py-3 px-2"
      >
        <h1 className='align-items-center'>Cart List</h1>
        <table className=" w-100 p-0 m-0 ">
          <tbody className=" w-100 p-0 m-0  ">
            <tr className="row  p-0 m-0   my-2 ms-1 border-bottom border-bottom-2" >
              <td className="sc-pic col-4 offset-md-1" >
                <h6 className="text-center"> image </h6>
              </td>
              <td className=" col-4 d-flex justify-content-center align-items-center ">
                <div className=" d-flex justify-content-between w-100 ">
                  <h6 className=" w-25">price</h6>
                  <h6 className="text-center w-75">name</h6>
                </div>
              </td>
              <td className=" col-2 d-flex justify-content-center align-items-center ">
                Delete
              </td>
            </tr>
            {cartDatas?.data?.map((item, ind) => (

              <tr className="row w-100  my-2 ms-1 border rounded-3" >
                <td className="sc-pic col-4 offset-md-1 text-center" >
                  <img src={item.cover_image} alt="" className=" img-fluid" width="100px" height="40px" />
                </td>
                <td className=" col-4 d-flex justify-content-center align-items-center ">
                  <div className=" d-flex flex-column flex-lg-row justify-content-between w-100 ">
                    <p className=" w-25">${item.price}</p>
                    <h6 className="text-center w-75">{item.title}</h6>
                  </div>
                </td>
                <td className=" col-2 d-flex justify-content-center align-items-center "
                onClick={() => handleDelete(item.book_id)}
                >
                  <RxCrossCircled size={30} className=' text-danger' />
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div
        className=" border border-2   my-3 mx-auto py-2 rounded-3 d-flex flex-column flex-md-row justify-content-between px-lg-5 "
      >
        <div className=" py-2">
          <span className=" fw-bolder fs-4 ps-5">Total:</span>
          <h4 className="float-end ps-5">
            ${cartDatas?.data.reduce((prev, item) => prev + item.price, 0)}
          </h4>            
        </div>
        <button onClick={handlecheckout} className=" btn btn-outline-primary " >Proceed to Checkout</button>
                 {/* */} 
        {/* {/* <CheckOutForm /> */}
      </div>
      <br />
    </div>
  );
}
export default ShoppingCart

