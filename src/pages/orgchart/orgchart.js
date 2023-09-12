
import React, { useState, useEffect } from "react";
import TeamLeaders from "./TeamLeaders";
import TeamDeputy from "./TeamDeputy";
import TeamEmployee from "./TeamEmployee";
import axios from 'axios';
import Swal from "sweetalert2";
import '../../css/orgchart.css';

export const Orgchart = () => {
        const [flippedCards, setFlippedCards] = useState([]);
        const [employeeData, setEmployeeData] = useState([]);
        

        const [tempData, setTempData] = useState([]); // 팀장배열
        const [dempData, setDempData] = useState([]); // 대리배열
        const [empData, setEmpData] = useState([]); // 사원배열

        useEffect(() => {
            async function fetchEmployeeData() {
                try {
                    const response = await axios.get("http://localhost:8080/api/v1/employee/empAll");

                    console.log('fetchEmployeeData 호출');

                    if (response.status === 200) {
                        const data = response.data.data;
                        setTempData(data.temp);
                        setDempData(data.demp);
                        setEmpData(data.emp);
                        console.log('Temp 호출', data.temp);
                        console.log('Demp 호출', data.demp);
                        console.log('Emp 호출', data.emp);

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
                }
            }

            // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
            fetchEmployeeData();
        }, []);


        // flipCard 함수 정의.
        const flipCard = (index) => {
            setFlippedCards((prevFlippedCards) => {
                if (prevFlippedCards.includes(index)) {
                    return prevFlippedCards.filter(cardIndex => cardIndex !== index);
                } else {
                    return [...prevFlippedCards, index];
                }
            });
        };

        // ceo 프로필 카드 렌더링 함수 
        const cepProfileCard = (name,imageSrc) => {
            return (
                <div className="profile-card">
                    <div className="front">
                        <img src={imageSrc} alt={`${name} Profile`}/>
                        <p>{name}</p><br />
                    </div>
                </div>
            );
        };

        // 부서명 
        const DepartmentNodes = () => {
            const departments = [
                "영업팀",
                "마케팅팀",
                "현장팀",
                "고객응대팀",
                "인사팀",
                "총무팀"
            ];
        
            return (
                <div className="level">
                    {departments.map((department, index) => (
                        <div key={index} className="node dept-node1">
                            <p>{department}</p>
                        </div>
                    ))}
                </div>
            );
        };

        return (
            <div className="body">
                <section>
                    <div className="title">
                        <h3>조직도</h3>
                        <hr className="titleline" />
                    </div>
        
                    {/* CEO 프로필 카드 */}
                    <div className="org-chart">
                        {cepProfileCard("CEO", "/common/images/ceo.png")}
                        <div className="node ceo-node">
                        </div><br/>
                        <div className="line1" /> 
                        <DepartmentNodes />
                    </div>  

                    {/* 팀장 프로필 카드 */}
                    <TeamLeaders tempData={tempData} />
                    
                    {/* 대리 프로필 카드 */}
                    <TeamDeputy dempData={dempData} flipCard={flipCard} flippedCards={flippedCards} />

                    {/* 사원 프로필 카드  */}
                    <TeamEmployee empData={empData} flipCard={flipCard} flippedCards={flippedCards}/>
                </section>
            </div>
        );
    };

    export default Orgchart;