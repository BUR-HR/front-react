import React from "react";
import table from "../../../css/module/table.module.css";
import section from "../../../css/module/section.module.css";
import "../../../css/payment.css";
import { MainTitle } from "../../../common/commons";

const SeveranceMain = () => {
    return (
        <>
            <MainTitle title={"퇴직금대장 조회"} />

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
                    <button>
                        <img src="/common/images/add.svg" alt="" />
                        추가
                    </button>
                </div>
            </div>

            <div className={`severance-content ${section.config}`}>
                <table className={table.table}>
                    <thead>
                        <tr>
                            <th>지급대장</th>
                            <th>급여구분</th>
                            <th>지급구분</th>
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
                        <td>2021/08 - 1</td>
                        <td>급여</td>
                        <td>1차</td>
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
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SeveranceMain;
