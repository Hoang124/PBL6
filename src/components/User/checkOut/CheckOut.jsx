import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios'
import useAuth from '../../../hook/useAuth'
import CartCheckOut from '../cartCheckOut/CartCheckOut'
import ChangeAddress from '../changeAddress/ChangeAddress'
import { useNavigate } from 'react-router-dom'
import Paypal from './Paypal'

const CheckOut = () => {

    const navigate = useNavigate()
    const { auth, cart } = useAuth()
    const [paymentMethods, setPaymentMethods] = useState([])
    const [payment, setPayment] = useState('')
    const [deliveries, setDeliveries] = useState([])
    const [delivery, setDelivery] = useState({})
    const [address, setAddress] = useState({})
    const [infoAddress, setInforAddress] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getAddress = async () => {
            const getAddressURL = '/api/v1/web/inforaddress'
            const accessToken = localStorage.getItem('token')
            try {
                const respone = await axios.get(getAddressURL,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                );
                setInforAddress([...respone.data.inforAddress])
                changeAddress(respone.data.inforAddress)
            } catch (error) {
                console.log(error);
            }
        }

        getAddress()
    }, [])

    const changeAddress = (infoAddress) => {
        const address = infoAddress.find(add => add.role === true)
        setAddress(address)
    }

    useEffect(() => {
        const GET_PAYMENTMETHOD_URL = '/api/v1/web/paymentmethod'
        async function getPaymentMethod() {
            try {
                const respone = await axios.get(GET_PAYMENTMETHOD_URL);
                setPaymentMethods(respone?.data?.payment_method)
                setPayment(respone?.data?.payment_method[0]._id)
            } catch (error) {
                console.log(error);
            }
        }
        getPaymentMethod();
    }, [])

    useEffect(() => {
        const GET_DELIVERY_URL = '/api/v1/cms/deliveries'
        async function getDelivery() {
            try {
                const respone = await axios.get(GET_DELIVERY_URL);
                setDeliveries(respone?.data?.delivery)
                setDelivery(respone?.data?.delivery[0])
            } catch (error) {
                console.log(error);
            }
        }
        getDelivery();
    }, [])

    function editProduct() {
        let products = []
        for (let c of cart.currentCart) {
            let product = {
                id_product: c.id_product._id,
                size: c.size._id,
                color: c.color._id,
                number: c.number,
                price: c.id_product.price
            }
            products.push(product)
        }
        return products
    }

    editProduct()

    async function placeOrder() {
        const BILL_INSERT_URL = 'api/v1/web/bill/insert'
        const accessToken = localStorage.getItem('token')
        console.log('token', accessToken)
        let bill = {
            product: editProduct(),
            payment_method: payment,
            delivery: delivery._id,
            productPrice: calSubTotal(),
            shipPrice: delivery.price,
            weight: 0,
            id_info: address._id
        }
        try {
            const response = await axios.post(BILL_INSERT_URL, bill, {
                headers: {
                    token: accessToken
                }
            });
            console.log('bill', response)
            window.location.href = '/Status'
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectPayment = (id) => {
        setPayment(`${id}`)
    }

    const bodyStyle = {
        minHeight: '700px',
        margin: '0 70px',
    }

    const activePaymentMethodStyle = {
        margin: '0 10px',
        padding: '2px',
        border: '2px solid #9c57ff',
        background: 'white',
        borderRadius: '3px'
    }

    const PaymentMethodStyle = {
        border: '2px solid #ccc',
        margin: '0 10px',
        padding: '2px',
        borderRadius: '3px'
    }

    function handleChangeDelevery(e) {
        const id = e.target.value
        const deli = deliveries.find(deli => deli._id === id)
        setDelivery({ ...deli })
    }

    function calSubTotal() {
        let total = 0
        for (let c of cart.currentCart) {
            total = total + c.id_product?.price * (1 - c.id_product?.discount / 100) * c.number;
            console.log(total, c.id_product?.price);
        }
        return total
    }
    const money = parseFloat((calSubTotal() / 23600).toFixed(1));

    return (
        <div style={bodyStyle} class="position-relative">
            {
                error === '' ? '' :
                    <div class="alert alert-warning alert-dismissible fade show position-fixed end-0" role="alert">
                        {error}
                        <button type="button" onClick={() => setError('')} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            }
            <div className='rounded-3' style={{ background: '#eee', padding: '10px', marginBottom: '10px' }}>
                <div className='fs-3'>Delivery Address</div>
                <div className='d-flex align-items-center'>
                    <div className='d-flex'>
                        <div className='me-3 fw-bold'>{auth.currentUser?.fullname}</div>
                        <div className='me-3 fw-bold'>{auth.currentUser?.phone}</div>
                        <div className='me-3'>
                            <div>
                                <span className='px-1'>{address?.address?.street}</span> -
                                <span className='px-1'>{address?.address?.id_commune.name}</span> -
                                <span className='px-1'>{address?.address?.id_district.name}</span> -
                                <span className='px-1'>{address?.address?.id_province.name}</span>
                            </div>
                        </div>
                        <div className='me-3 border border-danger text-danger' style={{ fontSize: '12px', height: '22px' }}>Default</div>
                    </div>
                    <div className=''>
                        <ChangeAddress/>
                    </div>
                </div>
            </div>
            <div style={{ background: '#eee', padding: '10px', marginBottom: '10px' }}>
                <div className='d-flex' style={{ padding: '10px', margin: '10px 0', background: '#eee', borderRadius: '3px' }}>
                    <div className='fs-5 text-start' style={{ width: '50%' }}>
                        Product Ordered
                    </div>
                    <div style={{ width: '20%' }}>
                        Unit Price
                    </div>
                    <div style={{ width: '15%' }}>
                        Quantity
                    </div>
                    <div style={{ width: '15%' }}>
                        Item subTotal
                    </div>
                </div>
                <div>
                    {
                        cart.currentCart.length === 0 ? <p>No product</p> :
                            cart.currentCart.map(c => (<CartCheckOut key={c.slug} cart={c} />))
                    }
                </div>
                <div className='d-flex'>
                    <div className='w-50'></div>
                    <div className='w-50'>
                        <div className='d-flex flex-fill'>
                            <div className='w-25'>
                                Shipping option:
                            </div>
                            <div className='w-50 text-start ps-5'>
                                {delivery.name}
                            </div>
                            <div className='w-10'>
                                {/* <!-- Button trigger modal --> */}
                                <a class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    change
                                </a>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Shipping Option</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body" onChange={handleChangeDelevery}>
                                                {
                                                    deliveries.map(deli => (
                                                        <div className='d-flex w-100'>
                                                            <input className='form-check-input m-2' checked={deli._id === delivery._id} value={deli._id} type="radio" name="delivery" />
                                                            <div className='d-flex justify-content-between w-100 text-start'>
                                                                <div className='w-75'>{deli.name}</div>
                                                                <div className='w-25'>{deli.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-25'>
                                {delivery.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                        <div className='text-start' style={{ marginLeft: '195px' }}>
                            {delivery.note}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ background: '#eee', padding: '10px', marginBottom: '10px' }}>
                <div className='d-flex p-2 border-bottom border-dark'>
                    <div className='me-5'>
                        Payment Method
                    </div>
                    <div className='d-flex'>
                        {paymentMethods.map(paymentMethod => (<button style={payment === paymentMethod._id ? activePaymentMethodStyle : PaymentMethodStyle} onClick={() => handleSelectPayment(paymentMethod._id)} key={paymentMethod._id}>{paymentMethod.name}</button>))}
                    </div>
                </div>
                {
                    paymentMethods.map(paymentMethod => (
                        <div className='d-flex flex-wrap mx-5'>
                            {
                                paymentMethod._id === payment ? paymentMethod.card.map(
                                    card => (
                                        <div className='text-start p-2 m-2 w-25 rounded-3' style={{ background: '#9c57ff', color: 'white' }}>
                                            <div>Bank: {card.bank}</div>
                                            <div>Name: {card.name}</div>
                                            <div>Card Number: {card.number}</div>
                                        </div>)) : ''
                            }
                            {paymentMethod._id === payment && paymentMethod.name === "Paypal" ?
                                <div className='p-2 m-2'>
                                    <Paypal Money={money} placeOrder={placeOrder} setError={setError} />
                                </div> : ''
                            }
                            {paymentMethod._id === payment && paymentMethod.name === "Cash on Delivery" ?
                                <div className='p-2 m-2'>
                                    <p>Payment on Delivery!!!!</p>
                                </div> : ''
                            }
                        </div>
                    ))
                }
                <div className='border-top border-dark d-flex'>
                    <div className='w-75'>

                    </div>
                    <div className='w-25 text-start'>
                        <div>
                            Merchandise Subtotal: {calSubTotal()?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                        <div>
                            Shipping Total: {delivery.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                        <div>
                            Total payment: {(calSubTotal() + delivery.price)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-row-reverse mx-5 my-3'>
                    <button onClick={placeOrder} className='btn  px-5' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white' }}>Place order</button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut