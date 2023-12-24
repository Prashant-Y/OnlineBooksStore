import React, { useState } from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import cart from '../components/assets/cart.png'
import {path} from "../App"
import { Link, useNavigate } from 'react-router-dom'

function Header({children}) {

  const isLogin=localStorage.getItem('isLogin')
  console.log(isLogin,'dgadgasd')
const navigate=useNavigate()
  return (
    <div class="container py-4">
    <div class="row gy-3">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <img src="img/logo.png" alt="" />
      </div>
      <div class="col-lg-5 col-md-6 col-sm-12">
        {children}
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <ul class="navbar-nav d-flex flex-row justify-content-around w-75">
          <li class="nav-item">
            <Link class="nav-link"  to={path.addBook}>ADD BOOKS</Link>
          </li>
          <li class="nav-item mt-2">
            <img src={cart} alt="" width="30px" />
          </li>
         {isLogin===true? <button class="px-4 py-2 rounded-pill text-light fw-bold border-0 bg-red" onClick={()=>navigate(path.login)}>Sign in</button>:
          <button class="px-4 py-2 rounded-pill text-light fw-bold border-0 bg-red" onClick={()=>{localStorage.clear(); navigate(path.login)}}>logout</button>}

        </ul>
      </div>

    </div>
  </div>

  )
}

export default Header
