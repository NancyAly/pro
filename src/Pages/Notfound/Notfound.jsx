import React, { useEffect, useState } from 'react'
import styles from './Notfound.module.css'
import NotfoundImage from '../../assets/Images/error.svg'
export default function Notfound() {
    const[count,setCount]=useState(0)
  return (
    <div className='container'>
      <img src={NotfoundImage} className='w-full' alt="" />

    </div>
  )
}
