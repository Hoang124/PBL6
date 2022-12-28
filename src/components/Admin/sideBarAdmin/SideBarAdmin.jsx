import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faList, faTable, faArrowDown, faLocationDot, faBarsProgress, faChartColumn, faUser, faMoneyCheckAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

const SideBarAdmin = () => {
    return (
        <div className='col-xl-2' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)' }}>
            <ul className="nav flex-column" style={{height:'690px'}}>
                <li className="nav-item">
                    <a className="nav-link text-start text-white border-bottom border-white" aria-current="page" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white" aria-current="page" href="#">Manager Shop</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="collapse" href="#product" role="button" aria-expanded="true" aria-controls="product">Product</a>
                    <ul className="nav flex-column collapse" id='product'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faCube} />
                                Product
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faList} />
                                Catergory
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faTable} />
                                Stock
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faArrowDown} />
                                Promotion
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="collapse" href="#shipment" role="button" aria-expanded="true" aria-controls="shipment">Shipment</a>
                    <ul className="nav flex-column collapse" id='shipment'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faLocationDot} />
                                Shipment
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faBarsProgress} />
                                Management
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="collapse" href="#statistic" role="button" aria-expanded="true" aria-controls="statistic">Statistic</a>
                    <ul className="nav flex-column collapse" id='statistic'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faChartColumn} />
                                Statistic
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="collapse" href="#user" role="button" aria-expanded="true" aria-controls="user">
                        User
                    </a>
                    <ul className="nav flex-column collapse" id='user'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faMoneyCheckAlt} />
                                Bill
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faBookOpen} />
                                Comment
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faAddressBook} />
                                Black List
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="#">
                                <FontAwesomeIcon className='me-2' icon={faUser} />
                                Account
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default SideBarAdmin