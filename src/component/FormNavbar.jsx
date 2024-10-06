import React from 'react'

const FormNavbar = () => {
  return (
    <div>
       
    <div className='w-full h-[10%] flex items-center bg-gray-50 fixed top-0 z-10'>
        <div className='text-gray-700 font-bold text-2xl p-4 '>Jobs Engine</div>
        <div className='flex mx-auto mr-10 gap-5 float-right'>
            <p className='font-bold text-gray-800'>Home</p>
            <p className='font-bold text-gray-800'>My Resume</p>
        </div>
    </div>
    </div>
  )
}

export default FormNavbar
