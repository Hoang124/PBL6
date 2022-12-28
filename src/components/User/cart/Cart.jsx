import React from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Cart = (props) => {

    const cart = props.cart
    const priceDiscount = cart.id_product.price * (100-cart.id_product.discount)/100

    function handleDelete(){
        if(props.deleteCart){
            props.deleteCart(cart._id)
        }
    }

    function handleQuantity(quan){
        if(props.updateCart){
            props.updateCart({id: cart._id, number: quan})
        }
    }
    console.log('cart:', cart)

    return (
        <div className='d-flex' style={{ padding: '10px', margin: '10px 0', background: '#eee', borderRadius: '3px', height: '100px' }}>
            <div className='d-flex align-items-center justify-content-center' style={{ width: '5%' }}>
                <input className='form-check-input' type="checkbox" />
            </div>
            <div className='d-flex justify-content-between align-items-center' style={{ width: '45%' }}>
                <div className='d-flex' style={{ width: '60%' }}>
                    <img style={{ width: '80px', height: '80px' }} src={cart.id_product?.urlImage?.length > 0 ? cart.id_product.urlImage[0]:''} alt="anh" />
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
                        <span className='me-2'><s>{cart.id_product.price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</s></span>
                        <span>{priceDiscount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                    </>:
                    <span>{cart.id_product.price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                }
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '15%' }}>
                <div style={{ border: '2px solid #aaa', width: 'fit-content' }}>
                    <button className='text-center' disabled={cart.number <= 0} onClick={() => handleQuantity(cart.number - 1)} style={{ width: '32px', height: '32px', border: 'none' }}>-</button>
                    <input className='text-center' readOnly type="text" style={{ width: '64px', height: '32px', border: 'none' }} value={cart.number} />
                    <button className='text-center' disabled={cart.number >= 10} onClick={() => handleQuantity(cart.number + 1)} style={{ width: '32px', height: '32px', border: 'none' }}>+</button>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '15%' }}>
                {(cart.number * (priceDiscount || 0)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '10%' }}>
                <button style={{border: 'none'}} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}

export default Cart