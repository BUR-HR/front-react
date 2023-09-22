import Exceljs from "exceljs";
import { saveAs } from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { call } from "../../../apis/service";
import popup from "./popup.module.css";

const PaymentLedgerPopup = () => {
    const [loading, setLoading] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const ref = useRef();
    const param = useParams();

    async function handleXLSX() {
        const workbook = new Exceljs.Workbook();
        const worksheet = workbook.addWorksheet("급여대장");

        worksheet.columns = [
            { header: "직급", key: "position" },
            { header: "이름", key: "name" },
            { header: "기본급", key: "basicSalary" },
            { header: "직책수당", key: "positionAllowance" },
            { header: "특별수당", key: "specialAllowance" },
            { header: "차량유지비", key: "vehicleMaintenance" },
            { header: "식대", key: "mealAllowance" },
            { header: "기타", key: "other" },
            { header: "급여합계", key: "totalIncome" },
            { header: "소득세", key: "incomeTax" },
            { header: "지방세", key: "localTax" },
            { header: "고용보험", key: "employmentInsurance" },
            { header: "국민보험", key: "nationalInsurance" },
            { header: "의료보험", key: "medicalInsurance" },
            { header: "기타", key: "otherDeductions" },
            { header: "공제계", key: "totalDeductions" },
            { header: "차감수령액", key: "netIncome" },
        ];

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "2023년 8월분 급여대장");
    }

    useEffect(() => {
        call("/api/v1/pay/payroll", "get", param)
            .then((data) => {
                setEmployeeList(data);
                setLoading(false);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div
            className={popup.ledgerpopup}
            style={{ display: loading ? "none" : "block" }}
        >
            <div className={popup.option}>
                <ReactToPrint
                    trigger={() => <button>출력</button>}
                    content={() => ref.current}
                />
                <button onClick={handleXLSX}>
                    <img src="/common/images/microsoft-excel.svg" alt="" />
                </button>
                <button onClick={() => window.close()}>닫기</button>
            </div>

            <table className={popup.table} ref={ref}>
                <thead>
                    <tr>
                        <th colSpan="17" style={{ fontSize: "30px" }}>
                            2023년 8월분 급여대장
                        </th>
                    </tr>
                    <tr>
                        <th colSpan="17">지급일 : 2023년 9월 15일</th>
                    </tr>
                    <tr>
                        <th rowSpan="3">직책</th>
                        <th rowSpan="3">성명</th>
                        <th colSpan="7">지급내용</th>
                        <th colSpan="7">공제내용</th>
                        <th rowSpan="3">차감수령액</th>
                    </tr>
                    <tr>
                        <th rowSpan="2">기본급</th>
                        <th rowSpan="2">직책수당</th>
                        <th rowSpan="2">특별수당</th>
                        <th rowSpan="2">차량유지비</th>
                        <th rowSpan="2">식대</th>
                        <th rowSpan="2">기타</th>
                        <th rowSpan="2">급여합계</th>
                        <th rowSpan="2">소득세</th>
                        <th rowSpan="2">지방세</th>
                        <th rowSpan="2">고용보험</th>
                        <th rowSpan="2">국민보험</th>
                        <th rowSpan="2">의료보험</th>
                        <th rowSpan="2">기타</th>
                        <th rowSpan="2">공제계</th>
                    </tr>
                    <tr></tr>
                </thead>
                <tbody id="payroll">
                    {employeeList.map((emp) => {
                        return (
                            <tr key={emp.empNo}>
                                <td>{emp.jobName}</td>
                                <td>{emp.empName}</td>
                                <td>{emp.salary.toLocaleString()}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{emp.mealAllowance.toLocaleString()}</td>
                                <td></td>
                                <td>{emp.totalIncome.toLocaleString()}</td>
                                <td>{emp.incomeTax.toLocaleString()}</td>
                                <td>{emp.localTaxes.toLocaleString()}</td>
                                <td>{emp.empInsure.toLocaleString()}</td>
                                <td>{emp.nationalPension.toLocaleString()}</td>
                                <td>{emp.healthInsurance.toLocaleString()}</td>
                                <td></td>
                                <td>{emp.totalDeductions.toLocaleString()}</td>
                                <td>{emp.netIncome.toLocaleString()}</td>
                            </tr>
                        );
                    })}

                    <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            합&nbsp;&nbsp;&nbsp; 계
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) => prev + current.salary,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.mealAllowance,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td></td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.totalIncome,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) => prev + current.incomeTax,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.localTaxes,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) => prev + current.empInsure,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.nationalPension,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.healthInsurance,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td></td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) =>
                                        prev + current.totalDeductions,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                        <td>
                            {employeeList
                                .reduce(
                                    (prev, current) => prev + current.netIncome,
                                    0
                                )
                                .toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PaymentLedgerPopup;
