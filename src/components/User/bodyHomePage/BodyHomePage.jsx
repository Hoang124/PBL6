import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import cartItem from '../../../assets/img/cart-item.png'
import axios from '../../../api/axios'

const BodyHomePage = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getWishList(){
            const WISHLIST_URL = 'api/v1/web/products/wish-list'
            try{
                const respone = await axios.get(`${WISHLIST_URL}/${1}`)
                console.log(respone)
                setProducts(respone.data.products)
            } catch(error){
                console.log(error)
            }
        }

        getWishList()
    }, [])

    console.log(products)

    const [active, setActive] = useState({})
    return (
        <div>
            <div>

            </div>
            <div className='mt-5'>
                <p className='text-primary'>CHOOSE FROM THE BEST PRODUCTs</p>
                <span className='fs-1 fw-bold'>Our Best Seller Product</span>
            </div>
            <div className='row' style={{ margin: '10px 100px 100px 100px' }} id="#favoriteItems">
                {
                    products.map(product => (<Card key={product._id} product={product.id_product} />))
                }
            </div>
        </div>
    )
}

export default BodyHomePage