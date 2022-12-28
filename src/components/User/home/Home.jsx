import React, { useEffect } from 'react'
import form22 from '../../../assets/img/Frame22.png'
import BodyHomePage from '../bodyHomePage/BodyHomePage'
import HeaderHomePage from '../headerHomePage/HeaderHomePage'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <HeaderHomePage />
      <img style={{ width: '100%' }} src={form22} alt="" />
      <BodyHomePage />
    </div>
  )
}

export default Home