import React, { useState } from "react";
import { MainTitle } from "../../../common/commons";
const PaymentMain = () => {

    const showPopup = () => {
        window.open('/pay/payroll/popup', "a", "width=1400, height=600, left=100, top=50")
    }

    return (
        <>
            <MainTitle title={"급여명세서 조회"} />
        </>
    );
};

export default PaymentMain;
