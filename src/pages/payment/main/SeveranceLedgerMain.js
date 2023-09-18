import React, { useEffect, useRef, useState } from "react";
import { call } from "../../../apis/service";
import { MainTitle, ModalBackdrop } from "../../../common/commons";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import "../../../css/payment.css";
import PaymentLegderModel from "../modal/PaymentLedgerPopup";
import PaymentModal from "../modal/PaymentModal";

const SeveranceLedgerMain = () => {
    const [severanceList, setSeveranceList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(0);
    const ref = useRef();

    const clickHandler = (index) => {
        setIsModalOpen(index);
    };

    const handleCloseModal = () => {
        setIsModalOpen(0);
    };

    useEffect(() => {
        call("/api/v1/pay/severance", "get", { name: ref.current.value })
            .then((data) => {
                setPayrollList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <MainTitle title={"퇴직금대장 조회"} />

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
                    <button onClick={() => clickHandler(1)}>
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
                        {severanceList.map((item) => {
                            return (
                                <tr key={item.no}>
                                    <td>{item.no}</td>
                                    <td>{item.paymentType}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {formmattedYearsAndDate(
                                            item.paymentScheduledDate,
                                            "/"
                                        )}
                                    </td>
                                    <td>근무기록확정</td>
                                    <td>
                                        전체계산
                                        <br />
                                        개인별계산
                                    </td>
                                    <td>15</td>
                                    <td>
                                        <div
                                            onClick={() => clickHandler(2)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            조회
                                        </div>
                                        {item.isClosed !== "Y" && (
                                            <>
                                                <div>마감</div>
                                                <div>삭제</div>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        조회
                                        <br />
                                        Emali
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ModalBackdrop isModalOpen={isModalOpen} />
                {isModalOpen !== 0 ? (
                    isModalOpen === 1 ? (
                        <PaymentModal
                            isOpen={isModalOpen}
                            handleCloseModal={handleCloseModal}
                            paymentType="퇴직금"
                        />
                    ) : (
                        <PaymentLegderModel
                            isOpen={isModalOpen}
                            handleCloseModal={handleCloseModal}
                            paymentType="퇴직금"
                        />
                    )
                ) : undefined}
            </div>
        </>
    );
};

export default SeveranceLedgerMain;
