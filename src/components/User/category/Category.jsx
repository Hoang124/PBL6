import React, { useEffect, useState } from 'react'
import './category.css'
import { faL, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../api/axios'
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'
import { useParams } from 'react-router-dom'
import CardSkeleton from '../cardSkeleton/CardSkeleton'
// import PropsType from 'prop-types'

// Category.PropsType{

// }

const Category = () => {

  const param = useParams()
  const [price, setPrice] = useState(1);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 16,
    count: 1//totalPages
  })

  // useEffect(() => {
  //   try {
  //     const requestURL = `${server}api/v1/web/count/:slug=all`
  //   } catch (error) {

  //   }
  // }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function getProduct() {
    const GET_PRODUCT = param.keyword ? `/api/v1/web/products/search/${param.catergoryId ? param.catergoryId : 'all'}/${param.keyword}` : `/api/v1/web/products/list/${param.catergoryId ? param.catergoryId : 'all'}`;
    try {
      setLoading(true)
      const response = await axios.get(`${GET_PRODUCT}/${pagination.page}`);
      console.log('load page:', response)
      setLoading(false)
      setListProduct([...response?.data?.products]);
      setPagination({ ...pagination, count: response?.data?.count })
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getProduct();

  }, [pagination.page]);

  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage })
  }

  var borderLine = { border_color: '#ccc' }
  console.log('loading', loading)
  return (
    <div className="px-5" style={{ minHeight: '700px' }}>
      <div className=''>

      </div>
      <div className="tagName">
        {/* <span>Tshirt</span> */}
      </div>
      <div className='body-category'>
        <div className="container-fluid">
          <div className='row'>
            <div className='col-xl-3 col-md-12'>
              <a className="nav-link link-dark text-start border-bottom border-2" style={borderLine} href="#">
                <span className="me-3">Filter</span>
                <div className='d-inline-block' data-bs-toggle="collapse" href="#filter" role="button" aria-expanded="false" aria-controls="filter">
                  <FontAwesomeIcon icon={faSliders} />
                </div>
              </a>
              <ul className="nav flex-column collapsing" id="filter">
                {/* <li className="nav-item border-bottom border-2" style={borderLine}>

                </li> */}
                <li className="nav-item border-bottom border-2 w-100" style={borderLine}>
                  <a className="nav-link link-dark text-start" href="#">
                    <span className="mb-2">
                      Price
                    </span>
                    <input type="range" className='form-range' id='price-range' min="10000" max="1000000" value={price} onChange={e => { setPrice(e.target.value) }} />
                    <div className='label-price d-flex justify-content-between'>
                      <span className='min-price fw-bolder'></span>
                      <span className='max-price fw-bolder'>{price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-9 col-md-12">
              <div className="row">
                {loading ? Array(16).fill(0).map((_, index) => (<CardSkeleton />)) : listProduct.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
                {
                  listProduct.length <=0 ? <div className='fs-3'>No product exists</div>:''
                }
              </div>
              {
                listProduct.length > 0 ?
                  <div>
                    <Pagination pagination={pagination} handlePageChange={handlePageChange} />
                  </div> :
                  ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category