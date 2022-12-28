import React, { useEffect } from 'react'
import useAuth from '../../../hook/useAuth'
import Cart from '../cart/Cart'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'

const Carts = () => {

    const { cart, cartAction } = useAuth()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const bodyStyle = {
        minHeight: '700px',
        margin: '0 70px',
    }

    function calculateTotalPrice(){
        let carts = cart.currentCart
        let total = 0;
        for(let c of carts){
            total += c.id_product.price * c.number *(100-c.id_product.discount)/100
        }
        return total
    }

    async function deleteCart(id) {
        const URL = '/api/v1/web/cart/delete'
        const accessToken = localStorage.getItem('token')
        try {
            if (accessToken) {
                cartAction({type: 'setLoading', payload: true})
                const response = await axios.delete(`${URL}/${id}`,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                )
                console.log('delete',response)
                cartAction({type: 'setLoading', payload: false})
                if(!cart.loading){
                    getCart()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function updateCart({id, number}) {
        const URL = '/api/v1/web/cart/update'
        const cart = {id, number}
        const accessToken = localStorage.getItem('token')
        try {
            if (accessToken) {
                cartAction({type: 'setLoading', payload: true})
                const response = await axios.put(URL, cart,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                )
                console.log('update', response)
                cartAction({type: 'setLoading', payload: false})
                if(!cart.loading){
                    getCart()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCart = async() =>{
        const URL = '/api/v1/web/cart/'
        const accessToken = localStorage.getItem('token')
        try {
            if (accessToken) {
                const response = await axios.get(URL,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                )
                console.log('getCart',response)
                cartAction({type: 'setCurrentCart', payload: response.data.cart.product})
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log('carts', cart)

    return (
        <div style={bodyStyle}>
            <div className='d-flex' style={{ padding: '10px', margin: '10px 0', background: '#eee', borderRadius: '3px' }}>
                <div style={{ width: '50%' }}>
                    Product
                </div>
                <div style={{ width: '20%' }}>
                    Unit Price
                </div>
                <div style={{ width: '15%' }}>
                    Quantity
                </div>
                <div style={{ width: '15%' }}>
                    Total Price
                </div>
                <div style={{ width: '10%' }}>
                    Action
                </div>
            </div>
            <div>
                {
                    cart.currentCart.length === 0 ? <p>No product</p> :
                        cart.currentCart.map(c => (<Cart key={c.slug} cart={c} deleteCart={deleteCart} updateCart={updateCart} />))
                }
            </div>
            <div className='shadow' style={{ background: '#eee', position: 'sticky', bottom: '0', zIndex: '2' }}>
                <div></div>
                <div></div>
                <div className='d-flex justify-content-center'>
                    <div className='fs-4 me-3'>
                        <span>Total ({cart.currentCart.length} item):</span>
                        <span>{calculateTotalPrice().toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                    </div>
                    <Link to={cart.currentCart.length > 0 ?'/CheckOut':'/Category'}>
                        <button className='btn' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}}>Check out</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Carts