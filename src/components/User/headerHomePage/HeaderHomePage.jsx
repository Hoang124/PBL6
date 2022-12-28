import React, { useState } from 'react';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import mainLogin from '../../../assets/img/mainLogin.png'
import anh1 from '../../../assets/img/anh1.png'
import anh2 from '../../../assets/img/anh2.png'
import anh3 from '../../../assets/img/anh3.png'

const HeaderHomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = [anh1, anh2, anh3];
  const headerSlideStyle = {
    border: 'solid 10px white',
    height: '522px', width: '400px',
    borderTopRightRadius: '100px',
    borderTopLeftRadius: '100px',
    borderBottomRightRadius: '100px',
    backgroundImage: `url(${slide[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  }

  const listSlideStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '290px',
    height: '80px',
    borderRadius: '10px',
    bottom: '30px',
    right: '50px',
    overflow: 'hidden'
  }

  const mainItemStyle = {
    height: '70px',
    width: '80px',
    backgroundImage: `url(${slide[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const preItemStyle = {
    height: '65px',
    width: '70px',
    backgroundImage: `url(${slide[currentIndex === 0 ? slide.length - 1 : currentIndex - 1]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const nextItemStyle = {
    height: '65px',
    width: '70px',
    backgroundImage: `url(${slide[currentIndex === slide.length - 1 ? 0 : currentIndex + 1]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const rightArrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '5px',
    height: '18px',
    width: '18px',
    color: "#fff",
    zIndex: 1,
    cursor: 'pointer',
    backgroundColor: '#5463FF'
  }
  const leftArrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '5px',
    height: '18px',
    width: '18px',
    color: "#fff",
    zIndex: 1,
    cursor: 'pointer',
    backgroundColor: '#5463FF'
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


  return (
    <div className='px-5 row w-100 m-0' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', height: '700px' }}>
      <div className='px-5 col-5' style={{ padding: '200px' }}>
        <span className='text-start float-start text-white fs-2 fw-bold pb-5'>Get The Latest Dress Modles From Us</span>
        <Link to='/Category'>
          <button className='btn bg-white float-start mt-5'>
            Shop now
          </button>
        </Link>
      </div>
      <div className='col-2 pt-5'>
        <span className='text-white fw-bold'>More list</span>
      </div>
      <div className='col-5 py-5'>
        <div style={headerSlideStyle}>
          <div className='d-flex justify-content-around align-items-center' style={listSlideStyle}>
            <FontAwesomeIcon onClick={goToPrevious} style={leftArrowStyle} icon={faAngleLeft} />
            <FontAwesomeIcon onClick={goToNext} style={rightArrowStyle} icon={faAngleRight} />
            <div style={preItemStyle}>

            </div>
            <div style={mainItemStyle}>

            </div>
            <div style={nextItemStyle}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderHomePage