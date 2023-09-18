import React, { useState, useEffect , useMemo   } from 'react';
import '../../../../css/inquiry.css';
import Swal from 'sweetalert2';
import NavBar from '../../../../common/component/NavBar';
import InquiryNav from '../nav/InquiryNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 추가
import { useTable } from 'react-table';
import { API_BASE_URL } from './../../../../apis/config';



// 사원조회 페이지
const InquiryMain = () => {
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [originalEmployeeData, setOriginalEmployeeData] = useState([]);
    const columns = useMemo(
        () => [
            {
                accessor:'empNo',
                Header: '사원번호',
            },
            {
                accessor:'empName',
                Header: '이름',
            },
            {
                accessor:'employeeGender',
                Header: '성별',
            },
            {
                accessor: 'deptCode',
                Header: '부서',
                Cell: ({ row }) => {
                    // 부서 코드에 해당하는 부서명을 가져오기
                    const dept = departmentOptions.find((option) => option.value === row.original.deptCode);
                    return dept ? dept.label : '';
                },
            },
            {
                accessor:'jobCode',
                Header: '직급',
                Cell: ({ row }) => {
                    const job = jobOptions.find((option) => option.value === row.original.jobCode);
                    return job ? job.label : '';
                },
            },
            {
                accessor:'employeeStatus',
                Header: '상태',
            },
            { 
                accessor:'hireDate',
                Header: '입사일',
            },
            { 
                accessor:'employeeEmail',
                Header: '이메일',
            },
            { 
                accessor:'employeePhone',
                Header: '전화번호',
            },
            { 
                accessor:'employeeAddress',
                Header: '주소',
            },
            { 
                accessor:'employeeRsdn',
                Header: '주민번호',
            },
            { 
                accessor:'bank',
                Header: '은행',
            },
            { 
                accessor:'payrollAcoount',
                Header: '계좌번호',
            },
        ],
        []
    );

        // 부서코드 값이 디비에 숫자로 들어가기 때문에 테이블에는 숫자가 아닌 부서명으로 보이기 위한 함수 
        const departmentOptions = [
            { value: "1", label: "영업팀" },
            { value: "2", label: "마케팅팀" },
            { value: "3", label: "현장팀" },
            { value: "4", label: "고객응대팀" },
            { value: "5", label: "인사팀" },
            { value: "6", label: "총무팀" },
        ];
        // 직급코드 값이 디비에 숫자로 들어가기 때문에 테이블에 숫자가 아닌 직급명으로 보이기 위한 함수
        const jobOptions = [
            { value: "1", label: "CEO"},
            { value: "2", label: "팀장"},
            { value: "3", label: "대리"},
            { value: "4", label: "사원"},
        ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: employeeData });

    const data = useMemo(() => {
        return employeeData.map((employee) => ({
            ...employee,
        }));
    }, [employeeData]);
    

    useEffect(() => {
        
        // API 호출을 통해 전체 직원 정보를 가져오는 함수
        async function  fetchAllEmployees() {   
            try {
                const response = await axios.get(API_BASE_URL+'/api/v1/employee/all');
                
                console.log('fetchAllEmployees함수 호출');

                if (response.status === 200) {
                    const data = response.data;
                    console.log('데이터확인' , data);
                    setEmployeeData(data.data);
                    setSearchResults(data.data); // 페이지가 열리면서 모든 직원을 보여줌
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '데이터 가져오기 실패',
                        text: '직원 정보를 가져오는데 문제가 발생했습니다.',
                    });
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'API 호출 에러',
                    text: 'API 호출 중에 문제가 발생했습니다.',
                });
            } finally {
                setLoading(false);
            }
        };
        

        fetchAllEmployees(); 
    }, []);

    useEffect(() => {
        setOriginalEmployeeData(employeeData);
    }, [employeeData]);
    
    const handleSearch = () => {
        const results = employeeData.filter((employee) => {
            return employee.empName.includes(searchName);
        });
          // 검색 결과가 없을 때 setSearchResults로 해당 문구를 설정합니다.
    setSearchResults(results.length === 0 ? ["해당 직원이 존재하지 않습니다"] : results);

    setEmployeeData(results);

    };
    
    

    return (
        <>
            <div className="title">
                <h3>사원조회</h3>
                <hr className="line" />
            </div>
    
            <div className="content">
                <div className="header__search">
                    {/* 검색창 */}
                    <div className="employeeList" style={{ overflowX: 'auto' }}>
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="조회할 직원의 이름을 입력하세요"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        {/* 검색 버튼  */}
                        <button className="searchButton" onClick={handleSearch}>검색</button>
                        {searchResults.length > 1 && (
                        <table {...getTableProps()} className="table">
                            <thead>
                            {headerGroups.length > 0 && (
                                // 검색 결과가 있을 때만 헤더 렌더링
                                headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                                    {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} className="table-cell">
                                        {column.render('Header')}
                                    </th>
                                    ))}
                                </tr>
                                ))
                            )}
                            </thead>
                            <tbody {...getTableBodyProps()} className="table-body">
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                <tr {...row.getRowProps()} className="table-row">
                                    {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className="table-cell">
                                        {cell.render('Cell')}
                                        </td>
                                    );
                                    })}
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        )}

                        {/* 검색 결과가 없을 때 문구를 출력 */}
                        {searchResults.length === 1 && searchResults[0] === '해당 직원이 존재하지 않습니다' && (
                        <p className="message">해당 직원이 존재하지 않습니다</p>
                        )}
                    </div>
                    </div>
                </div>
                </>
            );
};

export default InquiryMain;