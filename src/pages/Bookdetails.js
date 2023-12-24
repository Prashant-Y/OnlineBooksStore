import React, { useEffect } from 'react'
import coverr from '../components/assets/Coverr.png'
import { Nav, Spinner, Tab } from 'react-bootstrap'
import { useAddToCartMutation, useGetBookDetailsQuery } from '../services/Query'
import { useNavigate, useParams } from 'react-router-dom'
import { path } from '../App'
import toast from 'react-hot-toast'

function Bookdetails() {
    const { bookId } = useParams()
    const { data: bookdetails, isLoading, isError, isSuccess } = useGetBookDetailsQuery(bookId)
    const [addtocart, { isSuccess: bookAddedSuccess, isLoading: bookAddedLoading }] = useAddToCartMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookAddedSuccess) {
            toast.success('User Successfully registered');
            navigate(path.shoppingcart)
        }
    }, [bookAddedSuccess])

    const addedTocartHandle = async () => {
        const userData = JSON.parse(localStorage.getItem('userdetail'))
        await addtocart({
            "user_id": userData?.data.user_id,
            "book_id": bookdetails.data.book_id
        })
    }

    return (
        <>
            {
                isLoading ? <h1>isLoading</h1> : <div>
                    <div class="container ">
                        <div className='p-5 bg-danger rounded-3'>

                            <div class="carousel-inner px-5">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <img src={bookdetails.data.cover_image} class="d-block w-100" alt="..." />

                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-12">
                                        <h1 class="text-light fw-bold">{bookdetails.data.title}</h1>
                                        <span class="text-light">{bookdetails.data.author}</span>
                                        <div class="prize text-light fw-bold fs-2 mt-3">
                                            ${bookdetails.data.price}
                                        </div>
                                        <div class="star mt-2">
                                            <i class="fas fa-star text-light"></i>
                                            <i class="fas fa-star text-light"></i>
                                            <i class="fas fa-star text-light"></i>
                                            <i class="fas fa-star text-light"></i>
                                            <i class="fas fa-star text-light"></i>

                                        </div>
                                        <button class="px-5 py-3 rounded-pill text-light fw-bold border-light mt-3 border-1 fw-bold bg-primary" onClick={addedTocartHandle}> Add to Cart {bookAddedLoading && <Spinner animation="border" variant="light" />}</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" my-5">
                            <Tab.Container defaultActiveKey="summery">
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <Nav.Link eventKey="summery">Summery</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="author" >
                                            Author
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey='summery' className='bg-transparent'>
                                        <p className='text-dark'>{bookdetails.data.summary}</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="author" className='bg-transparent' >
                                        <p className='text-dark'>{bookdetails.data.summary}</p>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div >
            }
        </>

    )
}

export default Bookdetails
