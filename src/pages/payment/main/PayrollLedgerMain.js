import React, { useEffect, useRef, useState } from "react";
import { call } from "../../../apis/service";
import { MainTitle, ModalBackdrop } from "../../../common/commons";
import { formmattedYearsAndDate } from "../../../common/function/DateFormat";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import "../../../css/payment.css";
import PaymentModal from "../modal/PaymentModal";

const PayrollLedgerMain = () => {
    const [payrollList, setPayrollList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ref = useRef();

    const modalOpenHandler = () => {
        setIsModalOpen(true);
    };

    const modalCloseHandler = () => {
        setIsModalOpen(false);
    };

    const onClickHandler = (e, no) => {
        const target = e.target;
        
        if (target.tagName !== "DIV") {
            return;
        }

        if (target.textContent === "삭제") {
            call("/api/v1/pay/payroll", "delete", { no }).then((data) =>
                setPayrollList(data)
            );

            return;
        }

        if (target.textContent === "조회") {
            window.open('/pay/payroll/popup', "a", "width=1400, height=600, left=100, top=50")
            
            return;
        }

        if (target.textContent === "마감") {
            call("/api/v1/pay/payroll/close", "put", { no }).then((data) =>
                setPayrollList(data)
            );

            return;
        }
    };

    useEffect(() => {
        call("/api/v1/pay/payroll", "get", { name: ref.current.value })
            .then((data) => {
                setPayrollList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <MainTitle title={"급여대장 조회"} />

            <div className="search-bar">
                <div className="search-items">
                    <label htmlFor="search-input">대장명칭</label>
                    <input
                        className="search-input"
                        id="search-input"
                        ref={ref}
                    />
                    <button>
                        <img src="/common/images/search.svg" alt="" />
                        조회
                    </button>
                </div>
                <div>
                    <button onClick={modalOpenHandler}>
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
                            <th>급여대장</th>
                            <th>명세서</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrollList?.map((item) => {
                            return (
                                <tr
                                    key={item.no}
                                    onClick={(e) => onClickHandler(e, item.no)}
                                >
                                    <td>{item.no}</td>
                                    <td>급여</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {formmattedYearsAndDate(
                                            item.paymentScheduledDate,
                                            "/"
                                        )}
                                    </td>
                                    <td>근무기록확정</td>
                                    <td>
                                        {item.isClosed !== "Y" ? (
                                            <>
                                                전체계산
                                                <br />
                                                개인별계산
                                            </>
                                        ) : (
                                            <div>마감</div>
                                        )}
                                    </td>
                                    <td>{item.count}</td>
                                    <td>
                                        <div className="ledger-view">조회</div>
                                        {item.isClosed !== "Y" && (
                                            <>
                                                <div className="ledger-close">
                                                    마감
                                                </div>
                                                <div className="ledger-delete">
                                                    삭제
                                                </div>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <div className="ledger-view">조회</div>
                                        <div className="ledger-email">
                                            E-MAIL
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ModalBackdrop isModalOpen={isModalOpen} />
                {isModalOpen ? (
                    <PaymentModal
                        isOpen={isModalOpen}
                        modalCloseHandler={modalCloseHandler}
                        paymentType="급여"
                        setPayrollList={setPayrollList}
                    />
                ) : undefined}
            </div>
        </>
    );
};

export default PayrollLedgerMain;
