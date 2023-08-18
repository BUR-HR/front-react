import React from "react";
import Chart from "../../../common/chart";
import content from '../../../css/module/content.module.css';
import table from "../../../css/module/table.module.css";

const AttendanceContent = () => {
    const user = {
        name: "",
    };

    return (
        <>
            <div className={content.title}>근태관리</div>
            <div className="current-time">2023/08/07(월) AM 09:00:21</div>
            <div className="work-time">
                <div className="attendance-time page-config">
                    <h3>오늘 근무한 시간</h3>
                    <h2>{new Date().toLocaleTimeString()}</h2>
                    <div>
                        <button className="attendance-btn">출근</button>
                        <button className="attendance-btn">퇴근</button>
                    </div>
                    <h4>버튼을 눌러 출퇴근 시간을 기록하세요.</h4>
                </div>
                <div className="total-attendance-time page-config">
                    <h3>이번 주 근무</h3>
                    <Chart />
                </div>
            </div>
            <div className="attendance-info page-config">
                <div className="work-history">
                    근무 내역 <br />
                    <span
                        style={{
                            fontSize: "12px",
                            fontWeight: "normal",
                        }}
                    >
                        {user.name}님의 근무내역입니다.
                    </span>
                </div>
                <div className="work-hostory-date">
                    &lt; 2023.08.01 ~ 2032.08.07 &gt;
                </div>

                <table className={table.table}>
                    <thead>
                        <tr>
                            <th>일자</th>
                            <th>사원번호</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>근무시간</th>
                            <th>초과근무시간</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </>
    );
};

export default AttendanceContent;
