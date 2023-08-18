import React from 'react'
import Header from '../common/header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}

export default Layout