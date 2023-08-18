import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../common/NavBar";
import Main from "../../common/main";
import PaymentNav from './nav/PaymentNav';

const Payment = () => {
    return (
        <>
            <NavBar>
                <PaymentNav />
            </NavBar>
            <Main>
                <Outlet />
            </Main>
        </>
    );
};

export default Payment;
