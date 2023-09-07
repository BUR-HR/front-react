import React, { useState, useEffect } from 'react';
import '../../../../css/inquiry.css';
import Swal from 'sweetalert2';
import NavBar from '../../../../common/component/NavBar';
import InquiryNav from '../nav/InquiryNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 추가

// 사원조회 페이지
const InquiryMain = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [employeeData, setEmployeeData] = useState([]); 

    useEffect(() => {
        // API 호출을 통해 전체 직원 정보를 가져오는 함수
        async function  fetchAllEmployees() {   
            try {
                const response = await axios.get('http://localhost:8080/api/v1/employee/all');
                 
                console.log('fetchAllEmployees함수 호출');

                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setEmployeeData(data);
                    setSearchResults(data); // 페이지가 열리면서 모든 직원을 보여줌
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

    // const handleSearch = () => {
    //     const results = employeeData.filter((employee) => {
    //         return employee.EMP_NAME.includes(searchName);
    //     });
    //     setSearchResults(results);
    // };

    return (
        <>
            <div className="title">
                <h3>사원조회</h3>
                <hr className="line" />
            </div>

            <div className="content">
                <div className="header__search">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="직원 이름을 입력하세요"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    {/* <button className="searchButton" onClick={handleSearch}>
                        검색
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default InquiryMain;
