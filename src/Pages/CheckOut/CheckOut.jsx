import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
export default function CheckOut() {
   const [errorMsg, setErrorMsg] = useState(null)
   const {cashOnDelivery ,setNumOfCartItems,setCartId,onLinePayment}= useContext(CartContext)
   const navigate =useNavigate()
 
    const initialValues = {
      details: "",
      phone: "",
      city: "",
     
    };
    const validationSchema = Yup.object({
      details: Yup.string().required(),
      phone: Yup.string().required(),
      city: Yup.string().required(),
    
      })
   async function handleSubmit(data){
   let response = await onLinePayment({shippingAddress: data})
   console.log(response)
   if (response.data.status==='success'){
    window.location.href=response.data.session.url

   }
      //  let response = await cashOnDelivery({shippingAddress:data})
      //  console.log(response.data.status)
      //  if (response.data.status){
      //   setCartId(null)
      //   setNumOfCartItems(0)
      //   navigate("/allorders")

       }
      
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit,
      });
       
  return (
    <>
     <form onSubmit={formik.handleSubmit} className="w-[50%] my-8 mx-auto">
      <h1 className='text-3xl text-gray-600 mb-5'>check out</h1>
      {errorMsg &&( <div className='bg-red-300 p-3 rounded-md my-2'>{errorMsg}</div>)}
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name="details" id="floating_details" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_details" className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details:</label>
        {(formik.touched.details && formik.errors.details) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.details}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone:</label>
        {(formik.touched.phone && formik.errors.phone) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" name="city" id="floating_city" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_city" className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>
        {(formik.touched.city && formik.errors.city) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.city}</span>
        </div>)}
      </div>
      <button type="submit" className="btn w-full" >Pay</button>
    
      </form>
    </>
  )
}
