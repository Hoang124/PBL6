import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import defaultUser from '../../../assets/img/defaultUser.png'


const containerUserImage = {
  height: '50px',
  width: '50px',
  backgroundColor: 'white',
  backgroundImage: `url(${defaultUser})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '50%',
  margin: '0 20px 0 0'
}

const imageCommentStyle = {
  height: '50px', 
  width: '50px',
  marginRight: '5px'
}

const Comment = (props) => {

  const {content, id_account,  star, urlImage} = props.comment

  return (
    <div className='border-dark border-bottom m-3'>
      <div className='d-flex'>
        <div style={containerUserImage}>
        </div>
        <div>
          <p className='fw-bold'>{id_account?.name}</p>
          <div className="rating d-flex align-items-center">
            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={star >= 1 ? "yellow" : ""} />
            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={star >= 2 ? "yellow" : ""} />
            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={star >= 3 ? "yellow" : ""} />
            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={star >= 4 ? "yellow" : ""} />
            <FontAwesomeIcon icon={faStar} className="mx-1" size="xs" color={star >= 5 ? "yellow" : ""} />
          </div>
        </div>
      </div>
      <div className='content my-3'>
        <p className='text-start'>{content}</p>
        <div className='text-start'>
          {urlImage?.map(img => <img style={imageCommentStyle} src={img} alt="anh" />)}
        </div>
      </div>
    </div>
  )
}

export default Comment