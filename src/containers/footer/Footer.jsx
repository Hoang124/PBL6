import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faLinkedin, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className='bg-dark text-white pt-4 pb-4 pe-5 ps-5'>

            <div className="container text-center text-md-start">
                <div className="row text-center text-md-left">
                    <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-white">Shop Name</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, justo nec porttitor auctor, erat sapien faucibus lectus, vel tempor dolor augue et lectus. </p>

                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-white">Home</h5>
                        <p>
                            <a href="" className="text-white d-block text-decoration-none">Product</a>
                            <a href="" className="text-white d-block text-decoration-none">Category</a>
                            <a href="" className="text-white d-block text-decoration-none">Shop</a>
                            <a href="" className="text-white d-block text-decoration-none">Login</a>
                        </p>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-white">Shop</h5>
                        <p>
                            <a href="" className="text-white d-block text-decoration-none">TShirt</a>
                            <a href="" className="text-white d-block text-decoration-none">Jacket</a>
                            <a href="" className="text-white d-block text-decoration-none">Shirt</a>
                            <a href="" className="text-white d-block text-decoration-none">Jens</a>
                        </p>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-white">Category</h5>
                        <p>
                            <a href="" className="text-white d-block text-decoration-none">Men</a>
                            <a href="" className="text-white d-block text-decoration-none">Women</a>
                            <a href="" className="text-white d-block text-decoration-none">Children</a>
                        </p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-white">Contact</h5>
                        <div>
                            <p className="text-white d-block text-decoration-none">mangcoding@gmail.com</p>
                            <div>
                                <a href="#" className="text-white me-3">
                                    <FontAwesomeIcon icon={faFacebookSquare} size="xl" />
                                </a>
                                <a href="#" className="text-white me-3">
                                    <FontAwesomeIcon icon={faTwitterSquare} size="xl" />
                                </a>
                                <a href="#" className="text-white me-3">
                                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                                </a>
                                <a href="#" className="text-white me-3">
                                    <FontAwesomeIcon icon={faInstagramSquare} size="xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer