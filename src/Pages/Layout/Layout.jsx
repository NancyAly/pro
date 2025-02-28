import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    const[count,setCount]=useState(0)
  return (
    <>
    <Navbar/>

    <Outlet/>
    
    <Footer/>
    </>
  )
}
