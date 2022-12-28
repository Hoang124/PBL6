import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import anh1 from '../../../assets/img/anh1.png'
import anh2 from '../../../assets/img/anh2.png'
import anh3 from '../../../assets/img/anh3.png'
import Comments from '../comments/Comments'
import axios from '../../../api/axios'
import useAuth from '../../../hook/useAuth'

const ItemDetail = () => {
    const param = useParams()
    const { cart, cartAction } = useAuth()
    const [product, setProduct] = useState({})//thông tin sản phẩm sẽ được hiển thị
    const [rates, setRates] = useState({})
    const [comments, setComments] = useState([])
    const [number, setNumber] = useState([])
    const [stock, setStock] = useState(0)
    const [productBuy, setProductBuy] = useState({})//lấy thông tin sản phẩm mua
    const [isUpdateNC, setIsUpdateNC] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slide, setSlide] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        async function fecthData() {
            try {
                const requestURL = `api/v1/web/products/detail/${param.product}`
                const response = await axios.get(requestURL)
                const data = response.data
                console.log(response)
                setProduct({ ...data.product })
                setNumber([...data.number])
                setComments([...data.comment])
                setRates({ ...data.rate })
            } catch (error) {
                console.log(error)
            }
        }

        fecthData()
    }, [])

    useEffect(() => {
        if (Object.keys(product).length) {
            console.log('slide', product)
            setSlide([...product.urlImage])
        }
    }, [product.urlImage])

    useEffect(() => {
        setProductBuy({
            slug: `${product.slug}`,
            id_product: `${product._id}`,
            number: 0,
            color: product.color !== undefined ? product?.color[0]._id : '',
            size: product.size !== undefined ? product?.size[0]._id : ''
        })
    }, [product.slug])

    //refresh stock
    useEffect(() => {
        var stock = 0;

        if (productBuy.size && productBuy.color) {
            var num = number.find((n) => (n.size === productBuy.size && n.color === productBuy.color))
            if (num) stock = num.number
        }
        setStock(stock)
    },)

    //add cart

    const addCart = async ({id_product, slug, size, color, number }) => {
        const URL = '/api/v1/web/cart/insert'
        const cart = { id_product, size, color, number }
        console.log('cartReducerProduct', cart)
        const accessToken = localStorage.getItem('token')
        try {
            if (accessToken) {
                cartAction({type: 'setLoading', payload: true})
                const response = await axios.post(URL, cart,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                )
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

    const itemDetailStyle = {
        margin: '100px',
        minHeight: '700px',
        background: 'white'
    }


    const mainImageStyle = {
        width: '100%',
        height: '400px',
        backgroundImage: `url${anh1}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const radioStyle = {
        margin: '0 10px',
        height: '30px',
        width: '30px',
        border: 'none',
        borderRadius: '50%'
    }

    const radioSelectStyle = {
        margin: '0 10px',
        height: '30px',
        width: '30px',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        backgroundColor: '#A942FF'
    }

    const radioColorStyle = {
        borderRadius: '3px',
        margin: '0 10px',
        height: '32px',
        width: '64px',
        border: 'none',
    }

    const radioColorSelectStyle = {
        borderRadius: '3px',
        margin: '0 10px',
        height: '32px',
        width: '64px',
        border: 'none',
        color: 'white',
        backgroundColor: '#A942FF'
    }

    function handleSelectSize(e) {
        setProductBuy({ ...productBuy, size: `${e.target.name}`, number: 0 })
    }

    function handleSelectColor(e) {
        setProductBuy({ ...productBuy, color: `${e.target.name}`, number: 0 })
    }

    function setQuantity(quan) {
        setProductBuy({ ...productBuy, number: quan })
    }


    function priceDiscount(product) {
        return product.price * (100 - product.discount) / 100
    }

    //anh
    const headerSlideStyle = {
        width: '100%',
        height: '400px',
        backgroundImage: `url(${slide[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        marginBottom: '20px'
    }

    const listSlideStyle = {
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '180px',
        borderRadius: '10px',
        overflow: 'hidden'
    }

    const mainItemStyle = {
        height: '175px',
        width: '175px',
        backgroundImage: `url(${slide[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '3px'
    }

    const preItemStyle = {
        height: '165px',
        width: '170px',
        backgroundImage: `url(${slide[currentIndex === 0 ? slide.length - 1 : currentIndex - 1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '3px'
    }

    const nextItemStyle = {
        height: '165px',
        width: '170px',
        backgroundImage: `url(${slide[currentIndex === slide.length - 1 ? 0 : currentIndex + 1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '3px'
    }

    const rightArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '5px',
        height: '36px',
        width: '36px',
        color: "#fff",
        zIndex: 1,
        cursor: 'pointer',
        backgroundColor: '#5463FF',
        borderRadius: '3px',
    }
    const leftArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '5px',
        height: '36px',
        width: '36px',
        color: "#fff",
        zIndex: 1,
        cursor: 'pointer',
        backgroundColor: '#5463FF',
        borderRadius: '3px'
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newSlide = isFirstSlide ? slide.length - 1 : currentIndex - 1
        setCurrentIndex(newSlide)
    }


    const goToNext = () => {
        const isLastSlide = currentIndex === slide.length - 1;
        const newSlide = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newSlide)
    }

    console.log(product)
    return (
        <div style={itemDetailStyle}>
            <div className='d-flex mb-5'>
                <div className='w-50 me-3'>
                    <div>
                        <div style={headerSlideStyle}>

                        </div>
                        <div className='d-flex justify-content-around align-items-center' style={listSlideStyle}>
                            <FontAwesomeIcon className='shadow' onClick={goToPrevious} style={leftArrowStyle} icon={faAngleLeft} />
                            <FontAwesomeIcon className='shadow' onClick={goToNext} style={rightArrowStyle} icon={faAngleRight} />
                            <div className='shadow' style={preItemStyle}>

                            </div>
                            <div className='shadow' style={mainItemStyle}>

                            </div>
                            <div className='shadow' style={nextItemStyle}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-50 ms-3'>
                    <div>
                        <p className='text-start fw-bold fs-3'>{product.name}</p>
                    </div>
                    <div>
                        {
                            product.discount > 0 ? 
                                <div className='text-white fw-bold rounded-3' style={{width: '60px', height: '24px', background: 'red'}}>
                                    {product.discount + '%'}
                                </div>
                                :''
                        }
                    </div>
                    <div>
                        <p className='text-start'>{product.description}</p>
                    </div>
                    <div className="rating d-flex align-items-center">
                        <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={rates.rate >= 1 ? "yellow" : ""} />
                        <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={rates.rate >= 2 ? "yellow" : ""} />
                        <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={rates.rate >= 3 ? "yellow" : ""} />
                        <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={rates.rate >= 4 ? "yellow" : ""} />
                        <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={rates.rate >= 5 ? "yellow" : ""} />
                        <p className="number-rating ms-3 mb-0 text-secondary">({rates && rates?.amount})</p>
                    </div>
                    <div className='d-flex justify-content-between my-3 text-start'>
                        <div className="color-item text-start">
                            <div className='fw-bold mb-2' >Color</div>
                            {product.color ? (product.color).map((s, index) => (
                                <button key={index} onClick={handleSelectColor} name={s._id} style={productBuy.color === s._id ? radioColorSelectStyle : radioColorStyle} aria-label={s.name} aria-disabled={false}>{s.name}</button>
                            )) : ''}
                        </div>
                        <div>
                            <label className='fw-bold' htmlFor="">Stock</label>
                            <p>
                                <input type="text" style={{ border: 'none', width: '64px' }} readOnly value={stock} />
                                <FontAwesomeIcon icon={faCartShopping} />
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className='text-start fw-bold w-100' htmlFor="">Size</label>
                        <div className='text-start mt-2 mb-3'>
                            {product.size ? (product.size).map((s, index) => (
                                <button key={index} onClick={handleSelectSize} name={s._id} style={productBuy.size === s._id ? radioSelectStyle : radioStyle} aria-label={s.name} aria-disabled={false}>{s.name}</button>
                            )) : ''}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='text-start'>
                            <label className='w-100 text-start fw-bold mb-2' htmlFor="">Quantity</label>
                            <div style={{ border: '2px solid #DDDDDD', width: 'fit-content' }}>
                                <button className='text-center' disabled={productBuy.number <= 0} onClick={() => setQuantity(productBuy.number - 1)} style={{ width: '32px', height: '32px', border: 'none', backgroundColor: 'white' }}>-</button>
                                <input className='text-center' readOnly type="text" style={{ width: '64px', height: '32px', border: 'none', backgroundColor: 'white' }} value={productBuy.number} />
                                <button className='text-center' disabled={productBuy.number >= stock} onClick={() => setQuantity(productBuy.number + 1)} style={{ width: '32px', height: '32px', border: 'none', backgroundColor: 'white' }}>+</button>
                            </div>
                        </div>
                        <div>
                            {
                                product.discount > 0 ?
                                    <>
                                        <s><span className='mb-0 mt-3 me-3'>{product?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></s>
                                        <span className='text-danger mb-0 mt-3 fs-3'>{priceDiscount(product).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                    </>:
                                    <h3 className='mb-0 mt-3'>{product?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h3>
                            }
                        </div>
                    </div>
                    {/* <button className='btn btn-primary my-5' onClick={() => addCart({...productBuy})}>Check out</button> */}
                    <button className='btn btn-primary my-5' onClick={() => addCart({...productBuy})}>Check out</button>
                </div>
            </div>
            <div style={{ background: '#eee' }} className='rounded'>
                <p className='text-start fs-5 fw-bold m-3'>Comment</p>
                {comments.length > 0 ? <Comments comments={comments} /> : <p className='text-start'>No comment</p>}
            </div>
        </div>
    )
}

export default ItemDetail