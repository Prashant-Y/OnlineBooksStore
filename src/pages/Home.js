import React, { useEffect, useState } from 'react'
import '../Home.css'
import { useGetBooksQuery } from '../services/Query';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage1 from '../../src/components/assets/h1_hero1.png'
import heroImage2 from '../../src/components/assets/h1_hero2.png'
import heroImage3 from '../../src/components/assets/h1_hero3.png'
import drama from '../../src/components/assets/drama.png'
import coverr from '../../src/components/assets/Coverr.png'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import {path} from '../App'


function Home() {

  const { data: booksResponse, isLoading, isError } = useGetBooksQuery();
  const [search, setSearch] = useState('')
  const [filterData, setfilterData] = useState([])
  const navigate= useNavigate()


  useEffect(() => {
    console.log('inside useEffect')
    if (search) {
      console.log('Search', search);
      const filterdata = booksResponse?.data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      console.log(filterdata, 'filter data')
      setfilterData(filterdata)
    } else {
      console.log('inside else')
      setfilterData([]);
    }

  }, [search])


  return (
    <>
      {
        isLoading ? <h1>loading</h1> :

          <div>

            <Header><div class="container-fluid">
              <input class="form-control rounded-pill px-4 py-2" type="search" placeholder="Search book" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div></Header>

            {

              (filterData?.length > 0) ?
                <div className='row justify-content-around mt-4 mx-3'>
                  {
                    filterData?.map((item) => <>
                      <div class="col-lg-2 col-md-4 col-sm-12 mb-5">
                        <div class="card h-100">
                          <img src="cards/two.png" class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-title fw-bold">{item.title}</h5>
                            <p class="card-text text-secondary">J.R Rain</p>
                            <div class="details d-flex justify-content-between">
                              <div class="review">
                                <i class="fas fa-star orenge"></i>
                                <i class="fas fa-star orenge"></i>
                                <i class="fas fa-star orenge"></i>
                                <i class="fas fa-star orenge"></i>
                                <i class="fas fa-star orenge"></i>
                                <br /> <span class="text muted review">(120 Review)</span>
                              </div>
                              <p class="orenge fs-4 fw-bold">$50</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </>)
                  }
                </div>
                : <>
                  <div class="container-fluid slide1 pb-5">
                    <nav class="navbar navbar-expand-lg">
                      <div class="container-fluid ">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                          <ul class="navbar-nav m-auto w-25 d-flex justify-content-around">

                            <li class="nav-item">
                              <a class="nav-link fw-bold text-muted" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link fw-bold text-muted" href="#">Categories</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link fw-bold text-muted" href="#">Contact</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                    <div id="carouselExampleIndicators" class="carousel slide container" data-bs-ride="carousel">
                      <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      </div>
                      <div class="carousel-inner ">
                        <div class="carousel-item active ">
                          <img src={heroImage1} class="d-block w-100" alt="..." />

                          <div class="carousel-caption d-none d-md-block d-flex align-items-center h-75 w-25 m-auto">
                            <button class="bg-light text-muted rounded-pill border-0 py-1 px-3">Science Fiction</button>
                            <h1 class="carausel-h1 mb-3 mt-3 text-light">The History of Phipino</h1>
                            <button class="px-5 py-3 rounded-pill text-light fw-bold border-0 bg-red">Browse Store</button>

                          </div>
                        </div>
                        <div class="carousel-item">
                          <img src={heroImage2} class="d-block w-100" alt="..." />
                          <div class="carousel-caption d-none d-md-block d-flex align-items-center h-75 w-25 m-auto">
                            <button class="bg-light text-muted rounded-pill border-0 py-1 px-3">Science Fiction</button>
                            <h1 class="carausel-h1 mb-3 mt-3 text-light">The History of Phipino</h1>
                            <button class="px-5 py-3 rounded-pill text-light fw-bold border-0 bg-red">Browse Store</button>

                          </div>
                        </div>
                        <div class="carousel-item">
                          <img src={heroImage3} class="d-block w-100" alt="..." />
                          <div class="carousel-caption d-none d-md-block d-flex align-items-center h-75 w-25 m-auto">
                            <button class="bg-light text-muted rounded-pill border-0 py-1 px-3">Science Fiction</button>
                            <h1 class="carausel-h1 mb-3 mt-3 text-light">The History of Phipino</h1>
                            <button class="px-5 py-3 rounded-pill text-light fw-bold border-0 bg-red">Browse Store</button>

                          </div>
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>

                  <div className="container-fluid slide1 py-5">
                    <h2 className="text-center fw-bold">Best Selling Books Ever</h2>
                    <div className="container">
                      <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner mt-5">
                          {Array.isArray(booksResponse?.data) && booksResponse?.data.reduce((rows, book, index) => {
                            if (index % 4 === 0) rows.push([]);
                            rows[rows.length - 1].push(book);
                            return rows;
                          }, []).map((row, rowIndex) => (
                            <div key={rowIndex} className={`carousel-item ${rowIndex === 0 ? 'active' : ''}`}>
                              <div className="row">
                                {row.map((book, colIndex) => (
                                  <div key={colIndex} className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="card" style={{ height: '300px', width: '220px' }}>
                                      <img
                                        src={book.cover_image}
                                        className="card-img-top"
                                        alt={book.title}
                                        style={{ height: '260px', width: '220px' }}
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title fw-bold">{book.title}</h5>
                                        <p className="card-text text-secondary">{book.author}</p>
                                        <div className="details d-flex justify-content-between">
                                          <div className="review">
                                            {Array.from({ length: 5 }, (_, i) => (
                                              <i
                                                key={i}
                                                className={`fas fa-star orenge ${i < book.rating ? 'filled' : ''}`}
                                              ></i>
                                            ))}
                                            <br />
                                            <span className="text-muted review">({book.rating} Reviews)</span>
                                          </div>
                                          <p className="orenge fs-4 fw-bold">${book.price}</p>
                                        </div>
                                        <button onClick={()=>navigate(`${path.bookdetails}/${book.book_id}`)} className="btn btn-primary mt-3">Buy Now</button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="container-fluid py-5">
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-9 col-md-9 col-sm-12">
                          <div class="head-data d-flex justify-content-between">
                            <h2 class="fw-bold">Featured This Week</h2>
                            <button class="bg-transparent border-bottom border-top-0 border-start-0 border-end-0 text-muted">View All</button>
                          </div>
                          <div id="carouselExample" class="carousel bg-red mt-5 slide">
                            <div class="container p-5">
                              <div class="carousel-inner px-5">

                                <div class="carousel-item active">
                                  <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                      <img src={coverr} class="d-block w-100" alt="..." />

                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-12">
                                      <h1 class="text-light fw-bold">The Rage of Dragons</h1>
                                      <span class="text-light">By Eivan Winter</span>
                                      <div class="prize text-light fw-bold fs-2 mt-3">
                                        $50
                                      </div>
                                      <div class="star mt-2">
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>

                                      </div>
                                      <button class="px-5 py-3 rounded-pill text-light fw-bold border-light mt-3 border-1 fw-bold bg-transparent">View Details</button>

                                    </div>
                                  </div>
                                </div>
                                <div class="carousel-item">
                                  <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                      <img src="img/best-books1.png" class="d-block w-100" alt="..." />

                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-12">
                                      <h1 class="text-light fw-bold">The Rage of Dragons</h1>
                                      <span class="text-light">By Eivan Winter</span>
                                      <div class="prize text-light fw-bold fs-2 mt-3">
                                        $50
                                      </div>
                                      <div class="star mt-2">
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>

                                      </div>
                                      <button class="px-5 py-3 rounded-pill text-light fw-bold border-light mt-3 border-1 fw-bold bg-transparent">View Details</button>

                                    </div>
                                  </div>
                                </div>
                                <div class="carousel-item">
                                  <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                      <img src="img/best-books1.png" class="d-block w-100" alt="..." />

                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-12">
                                      <h1 class="text-light fw-bold">The Rage of Dragons</h1>
                                      <span class="text-light">By Eivan Winter</span>
                                      <div class="prize text-light fw-bold fs-2 mt-3">
                                        $50
                                      </div>
                                      <div class="star mt-2">
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>
                                        <i class="fas fa-star text-light"></i>

                                      </div>
                                      <button class="px-5 py-3 rounded-pill text-light fw-bold border-light mt-3 border-1 fw-bold bg-transparent">View Details</button>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                          <img src={drama} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
            }

            <div class="container-fluid my-5">
              <div class="container">
                <div class="row gx-5">
                  <div class="col-lg-6 col-md-6 col-sm-12 my-2">
                    <div class="card1  w-100 h-100 py-5 px-2">
                      <div class="row">
                        <div class="col text-center">
                          <h1 class="text-light">The History
                            of Phipino</h1>
                        </div>
                        <div class="col text-center">
                          <button class="px-4 py-2 mt-4 rounded-pill text-light fw-bold border-0 bg-red">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 my-2">
                    <div class="card2 w-100 h-100 py-5 px-2">
                      <div class="row">
                        <div class="col text-center">
                          <h1 class="text-light">Wilma Mumduya</h1>
                        </div>
                        <div class="col text-center">
                          <button class="px-4 py-2 mt-4 rounded-pill text-light fw-bold border-0 bg-red">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <Footer />
          </div>
      }
    </>

  )
}

export default Home



