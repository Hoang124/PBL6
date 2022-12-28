import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../../api/axios'

const RateComment = (props) => {
    const [product, setProduct] = useState(props.product)
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState('')
    const [urlImage, setUrlImage] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setProduct(props.product)
    }, [props.product.id])

    const submitImage = () => {
        let formData = new FormData()
        let photo = document.getElementById("image-file").files;
        if (photo.length === 0) {
            return;
        }
        for (let i = 0; i < photo.length; i++) {
            formData.append("image", photo[i]);
        }
        upLoadImgae(formData)
    }

    async function upLoadImgae(file) {
        const URL = "/api/v1/web/upload-image"
        try {
            setLoading(true)
            const response = await axios.post(URL, file, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            setUrlImage(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    async function submitRate() {
        const URL = 'api/v1/web/comment'
        const body = { urlImage: urlImage, content: comment, id_product: product._id, star: rate }
        const accessToken = localStorage.getItem('token')
        try {
            const response = await axios.post(URL, body, {
                headers: {
                    token: accessToken
                }
            });
            console.log(response)
            setRate(0)
            setUrlImage([])
            setComment('')
            setMessage('Successfull!')
        } catch (error) {
            console.log(error);
            setError('Comment not success')
        }
    }

    console.log('ratecomment', product)
    return (
        <div className='border-bottom border-dark py-2'>
            <div><h3>{product.name}</h3></div>
            <div className='d-flex'>

                <div className='me-3 fw-bold'>Product Quality</div>
                <div className="rating d-flex align-items-center">
                    <FontAwesomeIcon onClick={() => setRate(1)} icon={faStar} className="mx-1" size="xs" color={rate >= 1 ? "yellow" : ""} />
                    <FontAwesomeIcon onClick={() => setRate(2)} icon={faStar} className="mx-1" size="xs" color={rate >= 2 ? "yellow" : ""} />
                    <FontAwesomeIcon onClick={() => setRate(3)} icon={faStar} className="mx-1" size="xs" color={rate >= 3 ? "yellow" : ""} />
                    <FontAwesomeIcon onClick={() => setRate(4)} icon={faStar} className="mx-1" size="xs" color={rate >= 4 ? "yellow" : ""} />
                    <FontAwesomeIcon onClick={() => setRate(5)} icon={faStar} className="mx-1" size="xs" color={rate >= 5 ? "yellow" : ""} />
                </div>
            </div>
            <div>
                <div class="mb-3">
                    <label Htmlfor="exampleFormControlTextarea1" class="form-label fw-bold">Comment</label>
                    <textarea class="form-control" value={comment} onChange={(e) => setComment(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div>
                <label htmlFor="">Image</label>
                <input type="file" name='image-file' id='image-file' multiple="multiple" />
            </div>
            <div className='mt-3'>
                <button onClick={submitImage} className='btn btn-success'>Upload Image</button>
            </div>
            <div className='mt-3'>
                {
                    loading ?
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        urlImage.map((image, index) => <img key={index} className='m-2' style={{ width: '50px', height: '50px' }} src={`${image}`} alt="anh"></img>)
                }
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white' }} onClick={submitRate}>Comment</button>
            </div>
            {
                message === '' ? '' :
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" onClick={() => setMessage('')} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            }
                        {
                error === '' ? '' :
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" onClick={() => setError('')} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            }
        </div>
    )
}

export default RateComment