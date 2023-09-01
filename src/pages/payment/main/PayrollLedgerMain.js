import React, { useState } from "react";
import { MainTitle, ModalBackdrop } from "../../../common/commons";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import "../../../css/payment.css";
import PaymentModal from "../modal/PaymentModal";

const PayrollLedgerMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payroll, setPayroll] = useState({
        items: [],
    });

    const clickHandler = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MainTitle title={"급여대장 조회"} />

            <div className="search-bar">
                <div className="search-items">
                    <label htmlFor="search-input">대장명칭</label>
                    <input className="search-input" id="search-input" />
                    <button>
                        <img src="/common/images/search.svg" alt="" />
                        조회
                    </button>
                </div>
                <div>
                    <button onClick={clickHandler}>
                        <img src="/common/images/add.svg" alt="" />
                        추가
                    </button>
                </div>
            </div>

            <div className={`severance-content ${section.config}`}>
                <table className={table.table}>
                    <thead>
                        <tr>
                            <th>대장번호</th>
                            <th>구분</th>
                            <th>대장명칭</th>
                            <th>지급연월</th>
                            <th>사전작업</th>
                            <th>급여계산</th>
                            <th>인원수</th>
                            <th>퇴직금대장</th>
                            <th>명세서</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2021/08 - 1</td>
                            <td>급여</td>
                            <td>2021/08 1차 (급여)</td>
                            <td>2021/09</td>
                            <td>근무기록확정</td>
                            <td>
                                전체계산
                                <br />
                                개인별계산
                            </td>
                            <td>15</td>
                            <td>
                                조회
                                <br />
                                마감
                                <br />
                                삭제
                            </td>
                            <td>
                                조회
                                <br />
                                Emali
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ModalBackdrop isModalOpen={isModalOpen} />
                <PaymentModal
                    isOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                    paymentType="급여"
                />
            </div>
        </>
    );
};

export default PayrollLedgerMain;
