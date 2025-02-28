import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
export default function Footer() {
    const[count,setCount]=useState(0)
  return (
    <footer className='bg-[rgb(242,242,242)]  p-6'>
      <div className=" w-full container ">
        <h2 className='text-3xl text-[#212529]'>Get FreshCart App</h2>
        <p className='font-light text-[#6d767e]'>We Will send you a link,Open it on your phone to download the app</p>
        <div className="flex mb-5">
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        <button className='bg-main text-white rounded-md p-2 ms-3'>Share App Link</button>
        </div>
        <div className="partner flex justify-between py-6 border-y-2">
          <div className="Payment">
            <p>payment partenrs</p>
          </div>
          <div className="app">
            <p>Get deliveries with FreshCart</p>
          </div>
        </div>

      </div>
    </footer>
  )
}
