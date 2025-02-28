import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { tokenContext} from '../../Context/TokenContext';
export default function Login() {
    const[count,setCount]=useState(0)
    const [errorMsg, setErrorMsg] = useState(null);
    const [isCllingApi, setisCllingApi] = useState(false);
    const navigate = useNavigate()
    const {setToken}=useContext(tokenContext);

    const initialValues = {
      email: "",
      password: "",
    };
    async function handleLogin(data) {
    
      setisCllingApi(true) 
    console.log(data)
    await axios
    .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data)
    .then((response)=>{
      console.log(response);
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)
      setErrorMsg(null);
      setisCllingApi(false);
      navigate("/")
    })
    .catch((error)=>{
      setErrorMsg(error.response.data.message);
      setisCllingApi(false)

    });
    
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
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Email pattern is inavalid").required(),
      password: Yup.string().required().matches(/^[A-Za-z]{1}([A-Za-z0-9]){5,8}$/, `must be
       * Start with a letter (either uppercase or lowercase).
       * Be between 6 and 9 characters in total.
       * Can only contain letters (A-Z or a-z) and numbers (0-9)`),
      
  
    })
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit:handleLogin,
    });
  
    console.log(formik)
    return (
    <>
  
      <form onSubmit={formik.handleSubmit} className="w-[50%] my-8 mx-auto">
        <h1 className='text-3xl text-gray-600 mb-5'>Login Now</h1>
        {errorMsg &&( <div className='bg-red-300 p-3 rounded-md my-2'>{errorMsg}</div>)}
        
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
        
       
         {isCllingApi ? <div className=' w-auto flex justify-end'>
          <div className='bg-main p-2 rounded-md'>
          <ClipLoader color='text-main' size={20} />
          </div>
        </div>:
        <div className='text-center'>
        <button type="submit" className="text-white w-full bg-main bg-opacity-70 hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-main block ml-auto  disabled:bg-red-200" disabled={(!formik.isValid)}>Login</button>
  
        <p>
          <NavLink  to={'/ForgetPassword'} className="text-green-500">
          forgot your password
          </NavLink>
        </p>
        </div>
        }
      </form>

      </>
  
  
    )
  }
  
