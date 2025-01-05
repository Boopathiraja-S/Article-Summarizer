import React from 'react'
import HeaderImg from "../assets/Headerimg.png"
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className='bg-gray-700 text-white'>

      <div className='p-5 flex items-center justify-between mx-3 md:mx-6'>

        <div className=''>
          <img src={HeaderImg} className='rounded-full bg-blend-multiply w-12 hidden md:block' />
        </div>

        <div className='mx-auto'>
          <h2 className='text-2xl font-bold capitalize'>article Summarizer</h2>
        </div>
        <div className='text-2xl hidden md:block'>
        <FaUser />
        </div>
      </div>

    </div>
  )
}

export default Header