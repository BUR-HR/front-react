import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamEmployee = ({ empData }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    if (empData && empData.length > 0) {
      // 모든 대리에 대한 이미지 URL을 가져오는 반복문
      empData.forEach((Employee) => {
        fetch(`http://localhost:8080/api/file/fileimgs/${Employee.originFile}`)
          .then((response) => response.text())
          .then((data) => {
            setImageUrls((prevImageUrls) => ({
              ...prevImageUrls,
              [Employee.originFile]: data,
            }));
          })
          .catch((error) =>
            console.error("이미지 URL을 가져오는 동안 오류 발생:", error)
          );
      });
    }
  }, [empData]); // dempData가 변경될 때마다 실행

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

        let imageUrl;
        // 이미지 URL 가져오기
        if(imageUrls[originFile]){

            imageUrl = JSON.parse(imageUrls[originFile]);
        }
        
      
        // console.log('----------->',imageUrl.path.replace('/api/file',''));
        let loadImageUrl = 'http://localhost:8080' + imageUrl?.path.replace('/api/file','');
        return (
            <div className={`front ${flippedCards.includes(index) ? "hidden" : ""}`}>
                {imageUrl && <img src={loadImageUrl} alt={`${name} Profile`} />}
                <p><span className="position-text">사원</span> {name}</p>
            </div>
        );
    };


    // 뒷면 렌더링 함수
    const renderBack = (Employee) => (
        <div className="back">
            <p style={{ fontWeight: 'bold', fontSize: '13px', transform: 'scaleX(-1)' }}>{Employee.empName}</p>
            <p>대리</p>
            <hr />
            <p><span style={{ fontWeight: 'bold' }}>부서</span> : {Employee.dept.deptName}</p>
            <p><span style={{ fontWeight: 'bold' }}>직위</span> : {Employee.job.jobName}</p>
            <p><span style={{ fontWeight: 'bold' }}>HP</span> : {Employee.employeePhone}</p>
            <p><span style={{ fontWeight: 'bold' }}>Email</span> : {Employee.employeeEmail}</p>
        </div>
    );
    return (
        <div className="team-deputy-container">
          {empData.map((Employee, index) => (
            <div className={`node dept-node2`} key={index}>
              <div
                className={`profile-card2 ${
                  flippedCards.includes(index) ? "flipped" : ""
                }`}
                onClick={() => flipCard(index)}
              >
                <div className="card-inner">
                  {renderFront(
                    Employee.job.jobName,
                    Employee.empName,
                    Employee.originFile,
                    index
                  )}
                  {flippedCards.includes(index) && renderBack(Employee)}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
    export default TeamEmployee;