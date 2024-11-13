import React from 'react'
import Nav from '../../components/HomePageCompo/Nav'
import Footer from '../../components/HomePageCompo/Footer'

const Game = () => {
  return (
    <>
    <Nav/>
    <iframe 
  className="absolute top-[88px] left-0 w-full h-[calc(100vh-88px)]"  // This ensures iframe height is the remaining space after the navbar
  src="http://localhost:5174"
  title="Fuel Efficiency Tracking"
  frameBorder="0"
  scrolling="yes" // Allow scrolling if content exceeds height
/>
<Footer/>
    </>
  )
}

export default Game