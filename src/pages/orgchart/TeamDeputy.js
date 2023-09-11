import React, { useState } from "react";


const TeamDeputy = ({ teamDeputy }) => {
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
            <p><span className="position-text">대리</span> {name}</p>
        </div>
    );

    // 뒷면 렌더링 함수
    const renderBack = (deputy) => (
        <div className="back">
            <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{deputy.name}</p>
            <p>대리</p>
            <hr />
            <p><span style={{ fontWeight: 'bold' }}>부서</span> : {deputy.department}</p>
            <p><span style={{ fontWeight: 'bold' }}>직위</span> : {deputy.position}</p>
            <p><span style={{ fontWeight: 'bold' }}>HP</span> : {deputy.hp}</p>
            <p><span style={{ fontWeight: 'bold' }}>Email</span> : {deputy.email}</p>
            <p><span style={{ fontWeight: 'bold' }}>입사날짜</span> : {deputy.entryDate}</p>
        </div>
    );
    

    return (
        <div className="team-deputy-container">
            {teamDeputy.map((deputy, index) => (
                <div className={`node dept-node2`} key={index}>
                <div className={`profile-card2 ${flippedCards.includes(index) ? "flipped" : ""}`} onClick={() => flipCard(index)}>
                        <div className="card-inner">
                            {renderFront(deputy.position, deputy.name, deputy.imageSrc, index)}
                            {flippedCards.includes(index) && renderBack(deputy)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamDeputy;
