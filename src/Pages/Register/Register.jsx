import React, { useEffect, useState } from 'react'
import styles from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [isCllingApi, setisCllingApi] = useState(false)
  let navigate = useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  async function handleRegister(data) {
  
    
   try {
    setisCllingApi(true)
    setErrorMsg(null)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
    setisCllingApi(false)
    navigate("/login")
   } catch (error) {
    setErrorMsg(error.response.data.message)
    console.log(error.response.data.message,'error')
    setisCllingApi(false)
   }
    //  .then((response) =>{
    //   console.log(response);
    //   setErrorMsg(null);
    // })
    // .catch((error) =>{
    //   setErrorMsg(error.response.data.messege);
    // });
    
  }

  function ValidateData(data) {
    let errors = {};
    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const PasswordRegex = /^[A-Za-z]{1}([A-Za-z0-9]){5,8}$/;
    const PhoneRegex = /^01[0125][0-9]{8}$/;

    if (!data.name) {
      errors.name = "Name is required"

    } else if (data.name.length < 3) {
      errors.name = "Name min length is 3"

    }

    if (data.email === "") {
      errors.email = "Email is required"
    } else if (!EmailRegex.test(data.email)) {
      errors.email = "Email is not valid"

    }



    if (!data.password) {
      errors.password = "Password is required"
    } else if (!PasswordRegex.test(data.password)) {
      errors.Password = `must be
* Start with a letter (either uppercase or lowercase).
* Be between 6 and 9 characters in total.
* Can only contain letters (A-Z or a-z) and numbers (0-9)`

    }

    if (!data.repassword) {
      errors.repassword = "Repassword is required"
    } else if (data.password != data.repassword) {
      errors.rePassword = "repassword doesnot match"

    }



    if (data.phone === "") {
      errors.phone = "phone is required"
    } else if (!PhoneRegex.test(data.phone)) {
      errors.phone = "phone is not valid"

    }
    return errors;


  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name min length is 3"),
    email: Yup.string().email("Email pattern is inavalid").required(),
    password: Yup.string().required().matches(/^[A-Za-z]{1}([A-Za-z0-9]){5,8}$/, `must be
     * Start with a letter (either uppercase or lowercase).
     * Be between 6 and 9 characters in total.
     * Can only contain letters (A-Z or a-z) and numbers (0-9)`),
      rePassword:Yup.string().required().oneOf([Yup.ref("password")],"repassword doesnot match"),
    phone: Yup.string().required().matches(/^01[0125][0-9]{8}$/, "phone is not valid"),


  })
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handleRegister,
  });

  console.log(formik)
  return (


    <form onSubmit={formik.handleSubmit} className="w-[50%] my-8 mx-auto">
      <h1 className='text-3xl text-gray-600 mb-5'>Register Now</h1>
      {errorMsg &&( <div className='bg-red-300 p-3 rounded-md my-2'>{errorMsg}</div>)}
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="floating_name" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_name" className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
        {(formik.touched.name && formik.errors.name) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
        {(formik.touched.email && formik.errors.email) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
        {(formik.touched.password && formik.errors.password) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repassword} type="password" name="rePassword" id="floating_rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repassword:</label>
        {(formik.touched.rePassword && formik.errors.rePassword) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span>
        </div>)}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
        {(formik.touched.phone && formik.errors.phone) && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div>)}
        
      </div>
       {isCllingApi ? <div className=' w-auto flex justify-end'>
        <div className='bg-main p-2 rounded-md'>
        <ClipLoader color='text-main' size={20} />
        </div>
      </div>:
      
      <button type="submit" className="text-white bg-main bg-opacity-70 hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-main block ml-auto  disabled:bg-red-200" disabled={(!formik.isValid)}>Register</button>}
    </form>


  )
}
