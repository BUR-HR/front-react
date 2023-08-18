import React, { useState } from "react";
import TeamLeaders from "./TeamLeaders";
import TeamDeputy from "./TeamDeputy";
import TeamEmployee from "./TeamEmployee";
import '../css/orgchart.css'

export const Orgchart = () => {
    const [flippedCards, setFlippedCards] = useState([]); // flippedCards 변수 정의

    // flipCard 함수 정의
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
    const renderFront = (name, imageSrc, index) => (
        <div className={`front ${flippedCards.includes(index) ? "hidden" : ""}`}>
            <img src={imageSrc} alt={`${name} Profile`} />
            <p>{name}</p><br />
        </div>
    );

    // 뒷면 렌더링 함수
    const renderBack = (leader) => (
        <div className="back">
            <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{leader.name}</p>
            <p>팀장</p>
            <hr />
            <p><span style={{ fontWeight: 'bold' }}>부서</span> : {leader.department}</p>
            <p><span style={{ fontWeight: 'bold' }}>직위</span> : {leader.position}</p>
            <p><span style={{ fontWeight: 'bold' }}>HP</span> : {leader.hp}</p>
            <p><span style={{ fontWeight: 'bold' }}>Email</span> : {leader.email}</p>
            <p><span style={{ fontWeight: 'bold' }}>입사날짜</span> : {leader.entryDate}</p>
        </div>
    );

        // 직원 프로필 카드 렌더링 함수
    const renderProfileCard = (name, department, position, hp, email, entryDate, imageSrc, index) => {
        const isFlipped = flippedCards.includes(index);
            
        return (    
            <div className={`node dept-node2 ${isFlipped ? "flipped" : ""}`}>
                <div className="profile-card1" onClick={() => flipCard(index)}>
                    <div className="card-inner">
                        {renderFront(name, imageSrc, index)}
                        {isFlipped && renderBack({ name, department, position, hp, email, entryDate })}
                    </div>
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

    // 팀장 정보
    const teamLeaders = [
        {
            name: "이수혁",
            department: "영업팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/1.png"
        },
        
        {
            name: "박선애",
            department: "마케팅팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/2.png"
        },

        {
            name: "조세라",
            department: "현장팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/4.png"
        },

        {
            name: "이제훈",
            department: "고객응대팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/5.png"
        },

        {
            name: "황재승",
            department: "인사팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/7.png"
        },

        {
            name: "이현민",
            department: "총무팀",
            position: "팀장",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/8.png"
        },
    ];

    // 대리 정보
    const teamDeputy = [
        {
            name: "이지영",
            department: "영업팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/2.png"
        },
        {
            name: "최현우",
            department: "마케팅팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/5.png"
        },
        {
            name: "임지환",
            department: "현장팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/8.png"
        },
        {
            name: "우재효",
            department: "고객응대팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/1.png"
        },
        {
            name: "송유라",
            department: "인사팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/3.png"
        },
        {
            name: "오현주",
            department: "총무팀",
            position: "대리",
            hp: "010-1234-5678",
            email: "sample@bubble.com",
            entryDate: "2017/05/13",
            imageSrc: "/common/images/6.png"
        }
    ];

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
                    <hr className="line" />
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
                <TeamLeaders teamLeaders={teamLeaders} />
                
                {/* 대리 프로필 카드 */}
                <TeamDeputy teamDeputy={teamDeputy} flipCard={flipCard} flippedCards={flippedCards} />

                {/* 사원 프로필 카드  */}
                <TeamEmployee teamEmployee={teamEmployee} flipCard={flipCard} flippedCards={flippedCards}/>
            </section>
        </div>
    );
};

export default Orgchart;