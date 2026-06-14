import React from 'react'
import Header from './Header'
import MainBody from './MainBody'
import Heading from './Heading'
import { Outlet } from 'react-router-dom'

function SideBarPage() {
  return (
    <main className='bg-blue-200 h-screen grid grid-cols-12 '>
      <section className='col-span-2'>
      <Header/>
      <MainBody/>
      </section>
      <section className='col-span-10'>
        <Heading/>
        <Outlet/>
      </section>
    </main>
  )
}

export default SideBarPage