import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../../api/axios'
import Rates from '../rates/Rates'

const StatusType = (props) => {
    const [bills, setBills] = useState([])
    const [loading, setLoading] = useState(false)

    const GET_BILL_URL = 'api/v1/web/bill/type'
    const accessToken = localStorage.getItem('token')
    useEffect(() => {
        async function getBill() {
            try {
                setLoading(true)
                const respone = await axios.get(`${GET_BILL_URL}/${props.type}`,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                );
                console.log(respone)
                setBills([...respone.data.bill].reverse())
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getBill();
    }, [props.type])
    console.log(bills)
    return (
        <>
            {
                loading ?
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    bills.map(bill => (
                        <div key={bill._id} className='mb-3' style={{ background: '#eee' }}>
                            <div>
                                {
                                    bill.id_bill.product.map((product, id) => (
                                        <div key={id} className='d-flex p-3 flex-fill'>
                                            <div className='w-100 d-flex' style={{ height: '70px' }}>
                                                <img className='me-3 shadow' src={product.id_product.urlImage.length > 0 ? product.id_product.urlImage[0] : ''} alt="anh" style={{ height: '70px', width: '70px' }} />
                                                <div className='flex-fill text-start'>
                                                    <div style={{ height: '50px' }}>
                                                        {product.id_product.name}
                                                    </div>
                                                    <div>
                                                        x{product.number}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-25'>{product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='border-top border-dark py-3 d-flex'>
                                <div className='w-75'>

                                </div>
                                <div className='text-start'>
                                    <div className='py-2 fw-bold'>
                                        Ordered total: {bill.id_bill.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}

                                    </div>
                                    <div>
                                        {
                                            props.type == 4 ?
                                                <Rates product={bill.id_bill.product} /> :
                                                ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
        </>
    )
}

export default StatusType