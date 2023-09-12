import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamLeaders = ({ tempData }) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        if (tempData && tempData.length > 0) {
          // 모든 대리에 대한 이미지 URL을 가져오는 반복문
          tempData.forEach((leaders) => {
            fetch(`http://localhost:8080/api/file/fileimgs/${leaders.originFile}`)
              .then((response) => response.text())
              .then((data) => {
                setImageUrls((prevImageUrls) => ({
                  ...prevImageUrls,
                  [leaders.originFile]: data,
                }));
              })
              .catch((error) =>
                console.error("이미지 URL을 가져오는 동안 오류 발생:", error)
              );
          });
        }
      }, [tempData]); // dempData가 변경될 때마다 실행
    
        const flipCard = (index) => {
            setFlippedCards((prevFlippedCards) => {
                if (prevFlippedCards.includes(index)) {
                    return prevFlippedCards.filter((cardIndex) => cardIndex !== index);
                } else {
                    return [...prevFlippedCards, index];
                }
            });
        };
    
        // 앞면 렌더링 함수
        const renderFront = (position, name, originFile, index) => {
            // 이미지 URL 가져오기
            const imageUrl = imageUrls[originFile];
    
            return (
                <div className={`front ${flippedCards.includes(index) ? "hidden" : ""}`}>
                    {imageUrl && <img src={imageUrl} alt={`${name} Profile`} />}
                    <p><span className="position-text">팀장</span> {name}</p>
                </div>
            );
        };
    
    
        // 뒷면 렌더링 함수
        const renderBack = (leaders) => (
            <div className="back">
                <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{leaders.empName}</p>
                <p>대리</p>
                <hr />
                <p><span style={{ fontWeight: 'bold' }}>부서</span> : {leaders.dept.deptName}</p>
                <p><span style={{ fontWeight: 'bold' }}>직위</span> : {leaders.job.jobName}</p>
                <p><span style={{ fontWeight: 'bold' }}>HP</span> : {leaders.employeePhone}</p>
                <p><span style={{ fontWeight: 'bold' }}>Email</span> : {leaders.employeeEmail}</p>
                <p><span style={{ fontWeight: 'bold' }}>입사날짜</span> : {leaders.hireDate}</p>
            </div>
        );
        return (
            <div className="team-deputy-container">
              {tempData.map((leaders, index) => (
                <div className={`node dept-node2`} key={index}>
                  <div
                    className={`profile-card2 ${
                      flippedCards.includes(index) ? "flipped" : ""
                    }`}
                    onClick={() => flipCard(index)}
                  >
                    <div className="card-inner">
                      {renderFront(
                        leaders.job.jobName,
                        leaders.empName,
                        leaders.originFile,
                        index
                      )}
                      {flippedCards.includes(index) && renderBack(leaders)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        };
        
export default TeamLeaders;
