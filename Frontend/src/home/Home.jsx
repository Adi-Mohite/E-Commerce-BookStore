import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Freebook from '../components/Freebook'
import Footerr from '../components/Footerr'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Banner/>
        <Freebook/> 
        <Footerr/>
    </>
  )
}

export default Home