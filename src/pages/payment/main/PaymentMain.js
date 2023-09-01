import React, { useState } from "react";
import { MainTitle, ModalBackdrop } from "../../../common/commons";
import PayStub from "./../modal/PayStub";
const PaymentMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clickHandler = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MainTitle title={"급여명세서 조회"} />
            <ModalBackdrop isModalOpen={isModalOpen} />
            <PayStub isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
        </>
    );
};

export default PaymentMain;
