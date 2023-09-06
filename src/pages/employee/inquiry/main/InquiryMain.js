import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import '../../../../css/inquiry.css';
import Swal from 'sweetalert2';
import NavBar from "../../../../common/component/NavBar"; 
import InquiryNav from "../nav/InquiryNav"; 
import { login, call } from "../../../../apis/service";
import { useNavigate } from 'react-router-dom'; 

// 사원조회 페이지
const InquiryMain = ({ data }) => {

    const columnData = [
        {
            accessor: 'EMP_NAME', // TBL_EMPLOYEE 테이블의 컬럼에 해당, data object와 연결할 key name
            Header: '이름', // 테이블 헤더에 표시될 텍스트
        },
        {
            accessor: 'EMP_NO',
            Header: '사원번호'
        },
    ]

    const columns = useMemo(() => columnData, []);

    // 예시 데이터
    const exampleData = useMemo(() => [{
        "EMP_NAME" : "John Doe",
        "EMP_NO" : "12345"
    }], []);

    const [employee, setEmployeeData] = useState([]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: exampleData, // 예시 데이터를 사용하거나 API에서 가져온 데이터를 사용하세요.
    });

    return (
        <>
            <div className="title">
                <h3>사원조회</h3>
                <hr className="line" />
            </div>

            <div className="content">
                <div className="header__search">
                    {/* 카테고리 */}
                    <select className="header__searchSelect">
                        <option value="name">이름</option>
                        <option value="no">사번</option>
                        <option value="department">부서</option>
                    </select>
                    
                    {/* 검색창과 검색버튼 */}
                    <input type="text" className="searchInput" />
                    <button className="searchButton">검색</button>
                </div>

                <table {...getTableProps()} className="employee-table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InquiryMain;
