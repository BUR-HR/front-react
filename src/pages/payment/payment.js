import React from "react";
import { Outlet } from "react-router-dom";
import { Content, Main, NavBar } from "../../common/commons";
import "../../css/nav.css";
import PaymentNav from './nav/PaymentNav';

const Payment = () => {
    return (
        <Content>
            <NavBar>
                <PaymentNav />
            </NavBar>
            <Main>
                <Outlet />
            </Main>
        </Content>
    );
};

export default Payment;
