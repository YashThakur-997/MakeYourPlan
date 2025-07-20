import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-black justify-between p-2 text-white'>
        <div className='logo'>
            <span className='font-bold text-4xl ml-10'>MYP</span>
        </div>
        <ul className='flex gap-20 mr-10 items-center'>
            <li className=' ml-5 border-2 p-1 rounded-2xl bg-white w-20 flex justify-center text-xl text-black cursor-pointer hover:bg-black hover:text-white'>Home</li>
            <li className='border-2 p-1 rounded-2xl bg-white w-20 flex justify-center text-xl text-black cursor-pointer hover:bg-black hover:text-white'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
