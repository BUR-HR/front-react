import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../AuthContext";
import { call } from "../../../apis/service";
import { Chart, MainTitle } from "../../../common/commons";
import {
    formatElapsedTime,
    formattedDateTime,
} from "../../../common/function/DateFormat";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import { endWork, startWork } from "../api/AttendanceAPI";
import {
    SET_ATTENDANCE_HISTORY,
    SET_ATTENDANCE_TYPE,
    SET_ELAPSED_TIME,
    SET_START_TIME,
    initialState,
    reducer,
} from "../reducers/AttendanceReducer";

const AttendanceMain = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);
    const { startTime, elapsedTime, attendanceHistory, attendanceType } = state;
    const { user } = useAuth();
    const currentDate = moment();
    const startOfWeek = currentDate.clone().isoWeekday(1).format('YYYY.MM.DD'); // 이번주 월요일
    const endOfWeek = currentDate.clone().isoWeekday(7).format('YYYY.MM.DD'); // 이번주 일요일
    let interval = null;

    const handleAction = (type) => {
        if (type === "출근") {
            startWork().then((data) => {
                dispatch({ type: SET_START_TIME, payload: data.startDateTime });
                dispatch({
                    type: SET_ATTENDANCE_TYPE,
                    payload: data.attendanceType,
                });
            });
        }

        if (type === "퇴근") {
            endWork().then((data) => {
                dispatch({ type: SET_ELAPSED_TIME, payload: 0 });
                dispatch({
                    type: SET_ATTENDANCE_TYPE,
                    payload: data.attendanceType,
                });
            });
        }

        Swal.fire({
            icon: "success",
            text: `${attendanceType} 처리가 완료되었습니다.`,
        });
    };

    useEffect(() => {
        if (loading) {
            if (user.attendanceState) {
                dispatch({
                    type: SET_ATTENDANCE_TYPE,
                    payload: user.attendanceState,
                });
                dispatch({ type: SET_START_TIME, payload: user.startDateTime });
                setLoading(false);
            }

            return;
        }

        call("/api/v1/attendance").then((data) => {
            dispatch({ type: SET_ATTENDANCE_HISTORY, payload: data });
        });

        if (attendanceType === "퇴근") {
            interval = setInterval(() => {
                const elapsedTime = new Date() - new Date(startTime);

                dispatch({ type: SET_ELAPSED_TIME, payload: elapsedTime });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [attendanceType, user.attendanceState]);

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
                            disabled={attendanceType === "완료" ? true : false}
                        >
                            {attendanceType}
                        </button>
                    </div>
                    <h5>버튼을 눌러 출퇴근 시간을 기록하세요.</h5>
                </div>
                <div className={`total-attendance-time ${section.config}`}>
                    <h3>이번 주 근무</h3>
                    <Chart history={[...attendanceHistory]} />
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
                    &lt; {startOfWeek} ~ {endOfWeek} &gt;
                </div>

                <table className={table.table}>
                    <colgroup>
                        <col width={100} />
                        <col width={300} />
                        <col width={300} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>내역 번호</th>
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
                                        <td>
                                            {formattedDateTime(
                                                item.startDateTime
                                            )}
                                        </td>
                                        <td>
                                            {formattedDateTime(
                                                item.endDateTime
                                            )}
                                        </td>
                                        <td>{item.workTime}</td>
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
