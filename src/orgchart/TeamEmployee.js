import React, { useState } from "react";

const TeamEmployee = ({ teamEmployee }) => {
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
            <p><span className="position-text">{position}</span> {name}</p>
        </div>
    );

    // 뒷면 렌더링 함수
    const renderBack = (employee) => (
        <div className="back">
            <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{employee.name}</p>
            <p>{employee.position}</p>
            <hr />
            <p><span style={{ fontWeight: 'bold' }}>부서</span> : {employee.department}</p>
            <p><span style={{ fontWeight: 'bold' }}>직위</span> : {employee.position}</p>
            <p><span style={{ fontWeight: 'bold' }}>HP</span> : {employee.hp}</p>
            <p><span style={{ fontWeight: 'bold' }}>Email</span> : {employee.email}</p>
            <p><span style={{ fontWeight: 'bold' }}>입사날짜</span> : {employee.entryDate}</p>
        </div>
    );

    return (
        <div className="team-employee-container">
            {teamEmployee.map((employee, index) => (
                <div className={`node dept-node2`} key={index}>
                    <div className={`profile-card3 ${flippedCards.includes(index) ? "flipped" : ""}`} onClick={() => flipCard(index)}>
                        <div className="card-inner">
                            {renderFront(employee.position, employee.name, employee.imageSrc, index)}
                            {flippedCards.includes(index) && renderBack(employee)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamEmployee;
