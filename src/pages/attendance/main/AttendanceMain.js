import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { call } from "../../../apis/service";
import { Chart, MainTitle } from "../../../common/commons";
import {
    formatElapsedTime,
    formattedDate,
} from "../../../common/function/DateFormat";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";

const AttendanceMain = () => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [workType, setWorkType] = useState("");
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    const user = "";

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

    // useEffect(() => {
    //     call("/api/v1/attendance/").then((data) => {
    //         console.log(data);

    //         if (!data) return;

    //         setStartTime(new Date(data.workDate));
    //         setWorkType("출근");
    //     })
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            const elapsed = Math.floor((currentTime - startTime) / 1000); // in seconds
            setElapsedTime(elapsed);
        }, 1000); // Update every second

        call("/api/v1/attendance/start", "post", {
            workDate: startTime,
        }).then((data) => {
            console.log(data);
            setAttendanceHistory(data);
        });

        return () => {
            clearInterval(interval);
            call("/api/v1/attendance/end", "post", {
                workDate: startTime,
            }).then((data) => {
                console.log(data);

                if(data)
                setAttendanceHistory(data);
            });
        };
    }, []);

    return (
        <>
            <MainTitle title={"근태관리"} />
            <div className="current-time">{new Date().toLocaleString()}</div>
            <div className="work-time">
                <div className={`attendance-time ${section.config}`}>
                    <h3>오늘 근무한 시간</h3>
                    <h2>{formatElapsedTime(elapsedTime)}</h2>
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
                            <th>출근시간</th>
                            <th>퇴근시간</th>
                            <th>총 근무시간</th>
                            <th>초과근무시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory.length !== 0 &&
                            attendanceHistory.map((item, index) => {
                                return (
                                    <tr key={item.no}>
                                        <td>{index + 1}</td>
                                        <td>{formattedDate(item.workDate)}</td>
                                        <td>
                                            {formattedDate(item.leaveWorkDate)}
                                        </td>
                                        <td>{item.elapsedTime}</td>
                                        <td>{item.overTime}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AttendanceMain;
