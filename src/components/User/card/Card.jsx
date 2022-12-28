import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Card = (props) => {

    const product = { ...props.product }
    const imgStyle = {
        width: '100%',
        height: '60%',
        backgroundSize: 'cover'
    }

    function priceDiscount(product) {
        return product.price * (100 - product.discount) / 100
    }

    return (
        <div className="col-xl-3 col-md-6 col-sm-12 mt-4" style={{ height: '400px' }}>
            <Link to={`itemDetail/${product.slug}`} className="text-decoration-none text-dark">
                <div className='card-item h-100 card shadow'>
                    {/* <div> */}
                    <img src={product.urlImage ? product.urlImage[0] : ''} style={imgStyle} alt='anh' className='card-img-top card-fluid' />
                    {/* </div> */}
                    <div className='card-body' style={{ position: 'relative' }}>
                        <div className="">
                            <div style={{ height: '48px' }}>
                                <h6 className="cart-title text-start" style={{wordWrap: 'break-word', whiteSpace: 'normal', overflow: 'hidden', 
                                                                            display: '-webkit-box', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical',
                                                                            WebkitLineClamp: '2'}}>{product.name}</h6>
                            </div>
                            <div className="text-start">
                                {
                                    product.discount > 0 ?
                                        <><s><span className="me-2">{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></s>
                                        <span className="ms-2 text-danger">{priceDiscount(product)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></> :
                                        <span className="me-2">{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                }
                            </div>
                        </div>
                        <div className="rating d-flex align-items-center" style={{ position: 'absolute', bottom: '15px' }}>
                            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={product.rating >= 1 ? "yellow" : ""} />
                            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={product.rating >= 2 ? "yellow" : ""} />
                            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={product.rating >= 3 ? "yellow" : ""} />
                            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={product.rating >= 4 ? "yellow" : ""} />
                            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={product.rating >= 5 ? "yellow" : ""} />
                            <p className="number-rating ms-3 mb-0 text-secondary">({product.numberRating ? product.numberRating : '1k'})</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card