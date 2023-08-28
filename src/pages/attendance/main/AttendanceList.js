import React, { useEffect, useState } from "react";
import { call } from "../../../apis/service";
import { MainTitle } from "../../../common/commons";
import section from "../../../css/module/section.module.css";
import table from "../../../css/module/table.module.css";
import { formattedDateTime } from "./../../../common/function/DateFormat";

const AttendanceList = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')

    const onChangeHandle = (e) => {
      setValue(e.target.value)
    };
    
    const onKeyDownHandle = (e) => {
      if (e.key === 'Enter') {
        onSearchClickHandle();
      }
    }

    const onSearchClickHandle = () => {

    }

    useEffect(() => {
        call("/api/v1/attendance/list", "Get").then((data) =>
            setAttendanceHistory(data)
        );
    }, []);

    return (
        <>
            <MainTitle title={"근태현황"} />
            <div className="search-bar">
                <div className="search-items">
                    <select>
                    </select>
                    <input
                        className="search-input"
                        id="search-input"
                        placeholder="직원명 조회"
                        onChange={onChangeHandle}
                        onKeyDown={onKeyDownHandle}
                    />
                    <button onClick={onSearchClickHandle}>
                        <img src="/common/images/search.svg" alt="" />
                        조회
                    </button>
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
                    <colgroup>
                        <col width={100} />
                        <col width={100} />
                        <col width={150} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>내역 번호</th>
                            <th>사번</th>
                            <th>이름</th>
                            <th>출근시간</th>
                            <th>퇴근시간</th>
                            <th>근무시간</th>
                            <th>초과근무시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory?.length > 0 &&
                            attendanceHistory.map((item, index) => {
                                return (
                                    <tr key={item.no}>
                                        <td>{index + 1}</td>
                                        <td>{item.empNo}</td>
                                        <td>{item.employee?.empName}</td>
                                        <td>
                                            {formattedDateTime(item.startDateTime)}
                                        </td>
                                        <td>
                                            {formattedDateTime(item.endDateTime)}
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

export default AttendanceList;
