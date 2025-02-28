import React, { useEffect, useState } from 'react'
import styles from './ForgetPassword.module.css'
import axios from 'axios'
import { object } from 'yup'
import { NavLink } from 'react-router-dom'
export default function ForgetPassword() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState("")
  async function forgetPass(email) {
    try {
      setLoading(true)
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
      console.log(response)
      return { status: 'success', data: response };
    } catch (error) {
      return { status: 'error', data: error }
    } finally {
      setLoading(false)
    }
  }
  async function confirmResetCode(resetCode) {
    try {
      setLoading(true)
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode })
      console.log(response)
      return { status: 'success', data: response };
    } catch (error) {
      return { status: 'error', data: error }
    } finally {
      setLoading(false)
    }


  }

  async function handelSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    console.log(Object.fromEntries(formData))
    const response =
      message?.status === "success"
        ? message?.data?.data?.status === "Success" ?
          await resetPassword(Object.fromEntries(formData))
          : await confirmResetCode(Object.fromEntries(formData).restcode)
        : await forgetPass(Object.fromEntries(formData).email);

    setMessage(response);
  }

  async function resetPassword(formData) {
    try {
      setLoading(true)
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: formData.email,
        newPassword: formData.newPassword,
      })
      console.log(response)
      return { status: "success", data: response };
    } catch (error) {
      return { status: "error", data: error }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <section>

        <form onSubmit={handelSubmit} className="w-[50%] my-8 mx-auto">
          <h2 className='font-medium text-2xl text-gray-500 my-3'>Forget Password</h2>
          {message?.status !== "success" && message?.data?.response?.data?.message !== "Reset code is invalid or has expired" && (
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" name="email" id="floating_email" value={email} onChange={(e) => setEmail(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
            </div>)}

          {message && message?.data?.data?.status !== "Success" && (
            
              <p className={`m-3 text-center ${message?.status === "error" ? "bg-red-300 rounded " : "bg-green-300 rounded "}`} >
                {message?.status === "error"
                  ? message?.data?.response?.data?.message
                    ? message?.data?.response?.data?.message
                    : "something wrong"
                  : message?.data?.data.message
                  ? message?.data?.data.message
                  : `your password has been reset`}
                {!message?.data?.data.message && (<>
                  <br />
                  <NavLink className="font-semibold py-10 text-green-800 underline" to={'/login'}>Login now</NavLink>
                </>)
                }

              </p>
            
          )}
          {((message?.status === "success" && message?.data?.data?.message === "Reset code sent to your email") ||
            message?.data?.response?.data.message === "Reset code is invalid or has expired") && (
              <div className="relative z-0 w-full mb-5 group">
                <input type="number" name="restcode" id="floating_restcode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                <label htmlFor="floating_restcode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  please enter your code you've received </label>
              </div>
            )}

          {message?.status === "success" && message?.data?.data?.status === "Success" && (<>
            <div className="relative z-0 w-full mb-5 group">
              <input name='email' type="text" defaultValue={email} hidden />
              <input type="password" name="newPassword" id="floating_newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
              <label htmlFor="floating_newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                enter your new password</label>
            </div>


          </>
          )}
          {!message?.data?.data?.token &&
            (<button type="submit" className="text-white  bg-main bg-opacity-70 hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center w-full dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-main block ml-auto  disabled:bg-red-200" >
              {message?.data?.data?.status === "Success" ? "reset password" : "confirm"}
            </button>)
          }
        </form>
      </section>
    </div>
  )
}
