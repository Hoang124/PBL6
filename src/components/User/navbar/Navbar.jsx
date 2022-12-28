import React from 'react'
import 'bootstrap'
import './navbar.css'
import { faSearch, faCartPlus, faHistory } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../../assets/img/logo.png';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import { useState } from 'react';

const Navbar = () => {
    const { auth, cart } = useAuth()
    const numberCart = cart.currentCart.length
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    function handleSearch(e) {
        // e.preventDefault()
        if (search === '') return navigate('Category/all')
        else return navigate(`/Category/all/${search}`)
    }


    return (
        <div style={{ width: '100%', position: 'fixed', zIndex: '100' }} className='shadow-sm'>
            <nav style={{ width: '100%', height: '70px' }} className="navbar navbar-expand-lg navbar-light bg-light px-5">
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto" to="/">
                        <img src={logo} style={{ width: '50px', height: '50px' }} alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to="/Category">Shop</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" aria-current="page" to="/AboutUs">About us</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link position-relative" to='/Carts'>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    {
                                        numberCart > 0 ? <span className='position-absolute top-0 badge rounded-pill bg-danger end-20'>{numberCart}</span> : ''
                                    }
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" aria-current="page" to="/#favoriteItems">
                                    <FontAwesomeIcon icon={faHeart} />
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className={auth.currentUser ? 'nav-link' : 'nav-link pe-none'} to="/Account">
                                    <FontAwesomeIcon icon={faUser} />
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className={auth.currentUser ? 'nav-link' : 'nav-link pe-none'} to="/Status">
                                    <FontAwesomeIcon icon={faRectangleList} />
                                </NavLink>
                            </li>
                            {/* <li className="nav-item me-4">
                                <Link className="nav-link" aria-current="page" to="/Status">
                                    <FontAwesomeIcon icon={faRectangleList} />
                                </Link>
                            </li> */}
                            {auth.currentUser ? '' :
                                <li className='nav-item me-4'>
                                    <span>
                                        <Link className='text-decoration-none' to='/login'>Login</Link>/
                                        <Link className='text-decoration-none' to='/SignUp'>Register</Link>
                                    </span>
                                </li>}
                        </ul>
                        <form className="d-flex search-form">
                            <input className="form-control search-box" value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" onClick={(e) => handleSearch(e)} type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar