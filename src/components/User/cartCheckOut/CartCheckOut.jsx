import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CartCheckOut = (props) => {

    const cart = props.cart
    const priceDiscount = cart.id_product.price * (100 - cart.id_product.discount) / 100

    function handleDelete() {
        if (props.deleteCart) {
            props.deleteCart(cart._id)
        }
    }

    function handleQuantity(quan) {
        if (props.updateCart) {
            props.updateCart({ id: cart._id, number: quan })
        }
    }
    console.log('cart:', cart)

    return (
        <div className='d-flex text-start' style={{ padding: '10px', margin: '10px 0', background: '#eee', borderRadius: '3px', height: '100px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ width: '50%' }}>
                <div className='d-flex' style={{ width: '60%' }}>
                    <img style={{ width: '80px', height: '80px' }} src={cart.id_product?.urlImage?.length > 0 ? cart.id_product.urlImage[0] : ''} alt="anh" />
                    <div className='flex-fill d-flex align-items-center'>
                        {cart.id_product.name}
                    </div>
                </div>
                <div style={{ width: '40%' }}>
                    <div>Color: {cart.color.name}</div>
                    <div>Size: {cart.size.name}</div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '20%' }}>
                {
                    cart.id_product.discount > 0 ?
                        <>
                            <span className='me-2'><s>{cart.id_product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</s></span>
                            <span>{priceDiscount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                        </> :
                        <span>{cart.id_product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                }
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '15%' }}>
                <span>{cart.number}</span>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '15%' }}>
                {(cart.number * (priceDiscount || 0)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </div>
        </div>
    )
}

export default CartCheckOut