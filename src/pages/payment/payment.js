import React from "react";
import { Outlet } from "react-router-dom";
import { Content, Main, NavBar } from "../../common/commons";

import PaymentMain from "./main/PaymentMain";
import PayrollLedgerMain from "./main/PayrollLedgerMain";
import SeveranceLedgerMain from "./main/SeveranceLedgerMain";
import PaymentNav from "./nav/PaymentNav";

import "../../css/nav.css";
import SeveraceMain from "./main/SeveraceMain";
import PaymentLedgerPopup from "./modal/PaymentLedgerPopup";
import PayPopup from "./modal/PayPopup";
import PaymentLedgerUpdatePopup from './modal/PaymentLedgerUpdatePopup';

export {
    PaymentLedgerPopup,
    PaymentLedgerUpdatePopup,
    PaymentMain,
    PaymentNav,
    PayPopup,
    PayrollLedgerMain,
    SeveraceMain,
    SeveranceLedgerMain
};

export const Payment = () => {
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
