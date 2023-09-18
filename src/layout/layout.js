import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from '../common/commons';

const Layout = () => {
  const location = useLocation();
  
  return (
    <>
        {location.pathname === '/login' ? undefined : <Header/>}
        <Outlet/>
        <Footer />
    </>
  )
}

export default Layout