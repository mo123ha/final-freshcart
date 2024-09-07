import React from 'react'

import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  return (

    <>
    <Navbar/>
    <div className='contanier1  py-24'>

<Outlet/>
</div>
    
    </>

  )
}
