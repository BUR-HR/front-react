import React, { useEffect, useReducer } from "react";
import Swal from "sweetalert2";
import { call } from "../../../apis/service";
import { Chart, MainTitle } from "../../../common/commons";
import {
    formatElapsedTime,
    formattedDate,
} from "../../../common/function/DateFormat";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import {
    SET_ATTENDANCE_HISTORY,
    SET_ELAPSED_TIME,
    SET_START_TIME,
    SET_ATTENDANCE_TYPE,
} from "../reducers/AttendanceReducer";
import { useAuth } from "../../../AuthContext";
import { endWork, startWork } from "../api/AttendanceAPI";

const AttendanceMain = () => {
    const { attendanceState, attendanceDispatch } = useAuth();
    const { startTime, elapsedTime, attendanceHistory, attendanceType } = attendanceState;
    let interval = null;

    const handleAction = (type) => {
        if (type === "출근") {
            startWork({ attendanceType: type }).then((data) => {
                attendanceDispatch({ type: SET_START_TIME, payload: data.startDateTime });
                attendanceDispatch({ type: SET_ATTENDANCE_TYPE, payload: data.attendanceType})
            });
        }
        
        if (type === "퇴근") {
            endWork({attendanceType: type}).then((data) => {
                attendanceDispatch({ type: SET_ELAPSED_TIME, payload: 0 });
                attendanceDispatch({ type: SET_ATTENDANCE_TYPE, payload: data.attendanceType})
            });
        }

        Swal.fire({
            icon: "success",
            text: `${attendanceType} 처리가 완료되었습니다.`,
        });
    };

    useEffect(() => {
        call("/api/v1/attendance").then((data) => {
            console.log(data);
            console.log(attendanceHistory);
            console.log(attendanceType);

            attendanceDispatch({ type: SET_ATTENDANCE_HISTORY, payload: data });
        });

        if (attendanceType === '퇴근') {
            interval = setInterval(() => {
                console.log(startTime);
                const elapsedTime = new Date() - new Date(startTime)

                attendanceDispatch({type: SET_ELAPSED_TIME, payload: elapsedTime})
            }, 1000)
        }

        return (() => clearInterval(interval))
    }, [attendanceType]);

    return (
        <>
            <MainTitle title={"근태관리"} />
            <div className="current-time">{new Date().toLocaleString()}</div>
            <div className="work-time">
                <div className={`attendance-time ${section.config}`}>
                    <h3>오늘 근무한 시간</h3>
                    <h2>{formatElapsedTime(elapsedTime)}</h2>
                    <div>
                        <button
                            className="attendance-btn"
                            onClick={() => handleAction(attendanceType)}
                            disabled={(attendanceType === "완료"
                                ? true
                                : false)}
                        >
                            {attendanceType}
                        </button>
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
                    ></span>
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
                        {attendanceHistory?.length > 0 &&
                            attendanceHistory.map((item, index) => {
                                return (
                                    <tr key={item.no}>
                                        <td>{index + 1}</td>
                                        <td>{formattedDate(item.startDateTime)}</td>
                                        <td>
                                            {formattedDate(item.endDateTime)}
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
