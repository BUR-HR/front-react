import React, { useState } from "react";

const TeamLeaders = ({ teamLeaders }) => {
    const [flippedCards, setFlippedCards] = useState([]);

    const flipCard = (index) => {
        setFlippedCards((prevFlippedCards) => {
            if (prevFlippedCards.includes(index)) {
                return prevFlippedCards.filter(cardIndex => cardIndex !== index);
            } else {
                return [...prevFlippedCards, index];
            }
        });
    };

    // 앞면 렌더링 함수
    const renderFront = (position, name, imageSrc, index) => (
        <div className={`front ${flippedCards.includes(index) ? "hidden" : ""}`}>
            <img src={imageSrc} alt={`${name} Profile`} />
            <p><span className="position-text">팀장</span> {name}</p>
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


    return (
        <div className="team-leaders-container">
            {teamLeaders.map((leader, index) => (
                <div className={`node dept-node2`} key={index}>
                    <div className={`profile-card1 ${flippedCards.includes(index) ? "flipped" : ""}`} onClick={() => flipCard(index)}>
                        <div className="card-inner">
                            {renderFront(leader.position, leader.name, leader.imageSrc, index)}
                            {flippedCards.includes(index) && renderBack(leader)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamLeaders;
