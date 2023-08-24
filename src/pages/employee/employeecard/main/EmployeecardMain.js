import React, { useState } from "react";
import '../../../../css/employeecard.css';
import Swal from 'sweetalert2';
import NavBar from "../../../../common/component/NavBar"; 
import EmployeecardNav from "../nav/EmployeecardNav"; 
import { login, call } from "../../../../api/service";


// 인사카드 등록 페이지

    const EmployeecardMain = () => {
        const [selectedImage, setSelectedImage] = useState(null);
        const [employeeData, setEmployeeData] = useState({
            EMP_NO: "",
            EMP_NAME: "",
            DEPT_CODE: "",
            JOB_CODE: "",
            RSDN: "",
            EMAIL: "",
            PASSWORD: "",
            HIRE_DATE: "",
            PHONE: "",
            ADDRESS: "",
            PAYROLL_ACCOUNT: "",
            IS_EMPLOYED: "",
            STATUS: "",
            GENDER: "",
            LEAVE_DATE: "",
        });

    // 프로필 카드 이미지 등록 함수 
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // 글 등록 및 취소 버튼( SweetAlert2 모듈 사용)
    const handleAction = async (action) => {
        const actionText = action === "confirm" ? "등록" : "취소";
        const result = await Swal.fire({
            title: `${actionText} 하시겠습니까?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
    
        if (result.isConfirmed) {
            if (action === "confirm") {
                Swal.fire({
                    icon: 'success',
                    title: '등록 완료',
                    text: '등록이 완료되었습니다.',
                });
            } else if (action === "cancel") {
                Swal.fire({
                    icon: 'info',
                    title: '취소',
                    text: '취소되었습니다.',
                });
            }
        }

        if (action === "selectImage") {
            const fileInput = document.getElementById("file-input");
            if (fileInput) {
                fileInput.click(); // 파일 선택 창 열기
            }
        }
    };

    // 인사정보 등록
    const handleEmployeeRegistration = async () => {
        try {
        const response = await call('/path/to/register/api', 'POST', employeeData); // 실제 등록 API의 경로로 수정
        if (response) {
            Swal.fire({
            icon: 'success',
            title: '등록 완료',
            text: '등록이 완료되었습니다.',
            });
        } else {
            Swal.fire({
            icon: 'error',
            title: '등록 실패',
            text: '등록에 실패하였습니다.',
            });
        }
        } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: '등록 에러',
            text: '등록 중 에러가 발생했습니다.',
        });
        }
    };


    

    return (
        <>
                <div className="title">
                    <h3>인사카드 등록</h3>
                    <hr className="line" />
                </div>

                <div className="profile-body">

                    {/* 인사정보 입력 폼 */}
                    <div className="registercard">
                        <div className="employee-form1">
                            <h4 className="cardtitle">기본정보</h4>
                            <input
                                className="employee-form__input"
                                type="text"
                                placeholder="직원 이름"
                                value={employeeData.EMP_NAME}
                                onChange={(e) => setEmployeeData({ ...employeeData, EMP_NAME: e.target.value })}
                            />
                            <input
                                className="employee-form__input"
                                type="text"
                                placeholder="사원번호"
                                value={employeeData.EMP_NO}
                                onChange={(e) => setEmployeeData({ ...employeeData, EMP_NO: e.target.value })}
                            />

                            <div className="status-dropdown">
                            <select
                                value={employeeData.STATUS}
                                onChange={(e) => setEmployeeData({ ...employeeData, STATUS: e.target.value })}
                            >
                                <option value="" disabled hidden>상태</option>
                                <option value="재직">재직</option>
                                <option value="휴직">휴직</option>
                                <option value="퇴사">퇴사</option>
                            </select>
                        </div>

                            <input
                                className="employee-form__input"
                                type="text"
                                placeholder="입사일"
                                value={employeeData.HIRE_DATE}
                                onChange={(e) => setEmployeeData({ ...employeeData, HIRE_DATE: e.target.value })}
                            />
                            <input
                                className="employee-form__input"
                                type="text"
                                placeholder="퇴사일"
                                value={employeeData.LEAVE_DATE}
                                onChange={(e) => setEmployeeData({ ...employeeData, LEAVE_DATE: e.target.value })}
                            />

                        <div className="employee-form2">
                            <h4 className="cardtitle2">인사정보</h4>
                                <div className="status-dropdown2">
                                    <select
                                        value={employeeData.DEPT_CODE}
                                        onChange={(e) => setEmployeeData({ ...employeeData, DEPT_CODE: e.target.value })}
                                    >
                                        <option value="" disabled hidden>부서</option>
                                        <option value="총무팀">총무팀</option>
                                        <option value="영업팀">영업팀</option>
                                        <option value="마케팅팀">마케팅팀</option>
                                        <option value="현장팀">현장팀</option>
                                        <option value="고객응대팀">고객응대팀</option>
                                        <option value="인사팀">인사팀</option>
                                    </select>
                                </div>

                                <div className="status-dropdown2">
                                    <select
                                        value={employeeData.JOB_CODE}
                                        onChange={(e) => setEmployeeData({ ...employeeData, JOB_CODE: e.target.value })}
                                    >
                                        <option value="" disabled hidden>직위</option>
                                        <option value="팀장">팀장</option>
                                        <option value="대리">대리</option>
                                        <option value="사원">사원</option>
                                    </select>
                                </div>
                        </div>

                        <div className="employee-form3">
                            <h4 className="cardtitle3">개인정보</h4>
                                <div className="status-dropdown3">
                                    <select
                                        value={employeeData.GENDER}
                                        onChange={(e) => setEmployeeData({ ...employeeData, GENDER: e.target.value })}
                                    >
                                        <option value="" disabled hidden>성별</option>
                                        <option value="남자">남자</option>
                                        <option value="여자">여자</option>
                                    </select>
                                </div>

                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="주민등록번호"
                                value={employeeData.RSDN}
                                onChange={(e) => setEmployeeData({ ...employeeData, RSDN: e.target.value })}
                                />

                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="이메일"
                                value={employeeData.EMAIL}
                                onChange={(e) => setEmployeeData({ ...employeeData, EMAIL: e.target.value })}
                                />

                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="휴대폰"
                                value={employeeData.PHONE}
                                onChange={(e) => setEmployeeData({ ...employeeData, PHONE: e.target.value })}
                                />

                        </div>
                                

                                
                        </div>

                         {/* 프로필 이미지 */}
                        <div className="profile-image">
                            <img id="profile-img" src={selectedImage} alt="Profile Image" />
                            <div className="placeholder-text">이미지를 등록해주세요</div>
                        </div>

                        <div className="profile-buttons">
                        <button className="register-button" onClick={() => handleAction("confirm")}>등록</button>
                        <button className="delete-button" onClick={() => handleAction("cancel")}>취소</button>
                        </div>
                        <input
                            type="file"
                            id="file-input"
                            className="file-input"
                            style={{ display: 'block' }}
                            accept="image/*"
                            onChange={handleImageChange}
                    />


                </div>

                        
                    
                {/* 등록 및 취소 버튼 */}
                <div className="finalbutton">
                <button className="finalbutton1" onClick={handleEmployeeRegistration}>등록</button>
                <button className="finalbutton2" onClick={() => handleAction("cancel")}>취소</button>
                    </div>
                </div>
                

        
            </>
    );
};

export default EmployeecardMain;