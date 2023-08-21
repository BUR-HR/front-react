import React from "react";
import { Outlet } from "react-router-dom";
import { Content, Main, NavBar } from "../../common/commons";

import PaymentMain from "./main/PaymentMain";
import PayrollLedgerMain from "./main/PayrollLedgerMain";
import SeveranceMain from "./main/SeveranceMain";
import PaymentNav from "./nav/PaymentNav";

import "../../css/nav.css";

export { PaymentMain, PaymentNav, PayrollLedgerMain, SeveranceMain };

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
