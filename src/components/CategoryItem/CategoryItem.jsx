import React, { useEffect, useState } from 'react'
import styles from './CategoryItem.module.css'
import axios from 'axios'
export default function CategoryItem() {
    const[count,setCount]=useState(0)
    const [category,setCategory]=useState([])

   async function getCategoryl(){
     await axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((response)=>console.log(response.data.data.data?.data.data)).catch((err)=>err)
    }
    async function getCategoryl(){
      await axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((response)=>console.log(response)).catch((err)=>err)
     }
    useEffect(() => {
     getCategoryl()
    }, [])
    
  return (
    <div>CategoryItem</div>
  )
}
