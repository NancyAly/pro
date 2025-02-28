import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { Helmet } from 'react-helmet'
import LatestProducts from '../../components/LatestProducts/LatestProducts'
export default function Products() {
    const[count,setCount]=useState(0)
  return (
    <div>
      <Helmet>     
         <title>Products</title>
       </Helmet>

       


       <LatestProducts/>
    </div>
  )
}
