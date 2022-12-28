import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../../api/axios'
import RateComment from '../rateComment/RateComment'
import bootstrap from 'bootstrap'
import { Button, Modal } from 'react-bootstrap'
// import  from 'bootstrap'

const Rates = (props) => {
    // const [products, setProducts] = useState(props.product)

    // useEffect(() => {
    //     setProducts(props.product)
    // }, [props.product])

    const products = props.product
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function submitRate() {

    }

    console.log('rate', products)

    return (
        <div>
            <Button variant="primary" onClick={handleShow} style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white', width: '80px' }}>
                Rate
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {products?.map(prd => (
                        <RateComment key={prd.id_product._id} product={prd.id_product} submitRates={submitRate}/>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white', width: '80px' }}>Submit</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Rates