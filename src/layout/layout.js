import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../common/commons'

const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}

export default Layout