import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../common/NavBar";
import Content from "../../common/content";
import Main from "../../common/main";
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
