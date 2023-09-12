
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

        // 앞면 렌더링 함수
        // const renderFront = (name, imageSrc, index) => (
        //     <div className={`front ${flippedCards.includes(index) ? "hidden" : ""}`}>
        //         <img src={imageSrc} alt={`${name} Profile`} />
        //         <p>{name}</p><br />
        //     </div>
        // );

        // 뒷면 렌더링 함수
        // 뒷면 렌더링 함수
        // const renderBack = (deputy) => (
        //     <div className="back">
        //         <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{deputy.empName}</p>
        //         <p><span style={{ fontWeight: 'bold' }}>직위</span> : 대리</p>
        //         <hr />
        //         <p><span style={{ fontWeight: 'bold' }}>부서</span> : {deputy.deptCode .deptName}</p>
        //         <p><span style={{ fontWeight: 'bold' }}>직위</span> : {deputy.jonCode.jobName}</p>
        //         <p><span style={{ fontWeight: 'bold' }}>HP</span> : {deputy.hp}</p>
        //         <p><span style={{ fontWeight: 'bold' }}>Email</span> : {deputy.email}</p>
        //         <p><span style={{ fontWeight: 'bold' }}>입사날짜</span> : {deputy.entryDate}</p>
        //     </div>
        // );


            // 직원 프로필 카드 렌더링 함수
        // const renderProfileCard = (name, department, position, hp, email, entryDate, imageSrc, index) => {
        //     console.log('renderProfileCard호출',name, department, position, hp, email, entryDate, imageSrc, index);
        //     const isFlipped = flippedCards.includes(index);
                
        //     return (    
        //         <div className={`node dept-node2 ${isFlipped ? "flipped" : ""}`}>
        //             <div className="profile-card1" onClick={() => flipCard(index)}>
        //                 <div className="card-inner">
        //                     {renderFront(name, imageSrc, index)}
        //                     {isFlipped && renderBack({ name, department, position, hp, email, entryDate })}
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // };

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


        // 사원 정보
        const teamEmployee = [
            {
                name: "김수지",
                department: "영업팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/3.png"
            },
            {
                name: "정한나",
                department: "마케팅팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/6.png"
            },
            {
                name: "서지원",
                department: "현장팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/9.png"
            },
            {
                name: "홍예지",
                department: "고객응대팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/10.png"
            },
            {
                name: "장현식",
                department: "인사팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/7.png"
            },
            {
                name: "김세훈",
                department: "총무팀",
                position: "사원",
                hp: "010-1234-5678",
                email: "sample@bubble.com",
                entryDate: "2017/05/13",
                imageSrc: "/common/images/1.png"
            }
        ];

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