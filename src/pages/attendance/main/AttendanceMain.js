import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Chart, MainTitle, ModalBackdrop } from "../../../common/commons";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";

const AttendanceMain = () => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [workType, setWorkType] = useState("");

    const handleType = (type) => {
        if (type !== workType) setWorkType(type);
        if (type === "출근") setStartTime(new Date());
        else setElapsedTime(0);
    };

    const handleAction = async (action) => {
        handleType(action);
        const actionText = action;

        Swal.fire({
            icon: "success",
            text: `${actionText} 처리가 완료되었습니다.`,
        });
    };

    useEffect(() => {
        if (startTime && workType === "출근") {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const elapsed = Math.floor((currentTime - startTime) / 1000); // in seconds
                setElapsedTime(elapsed);
            }, 1000); // Update every second

            return () => clearInterval(interval);
        }
    }, [startTime, workType]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const user = {
        name: "",
    };

    return (
        <>
            <MainTitle title={"근태관리"} />
            <div className="current-time">{new Date().toLocaleString()}</div>
            <div className="work-time">
                <div className={`attendance-time ${section.config}`}>
                    <h3>오늘 근무한 시간</h3>
                    <h2>{formatTime(elapsedTime)}</h2>
                    <div>
                        {workType !== "출근" ? (
                            <button
                                className="attendance-btn"
                                onClick={() => handleAction("출근")}
                            >
                                출근
                            </button>
                        ) : (
                            <button
                                className="attendance-btn"
                                onClick={() => handleAction("퇴근")}
                            >
                                퇴근
                            </button>
                        )}
                    </div>
                    <h5>버튼을 눌러 출퇴근 시간을 기록하세요.</h5>
                </div>
                <div className={`total-attendance-time ${section.config}`}>
                    <h3>이번 주 근무</h3>
                    <Chart />
                </div>
            </div>
            <div className={`attendance-info ${section.config}`}>
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

export default AttendanceMain;
