import React, { useState } from "react";
import '../../../../css/employeecard.css';
import Swal from 'sweetalert2';
import NavBar from "../../../../common/component/NavBar"; 
import EmployeecardNav from "../nav/EmployeecardNav"; 
import { login, call } from "../../../../apis/service";
import { useNavigate } from 'react-router-dom'; 
import DatePicker from "react-datepicker";
import ko from 'date-fns/locale/ko';

    // 인사카드 등록 

    const EmployeecardMain = () => {
        const navigate = useNavigate(); 
        const [selectedImage, setSelectedImage] = useState(null);
        const [showDatePicker, setShowDatePicker] = useState(false);
        const [employeeData, setEmployeeData] = useState({
            empNo: "",
            empName: "",
            deptCode: "",
            jobCode: "",
            employeeRsdn: "",
            employeeEmail: "",
            hireDate: "",
            employeePhone: "",
            employeeAddress: "",
            payrollAccount: "",
            isEmployed: "",
            employeeGender: "",
            employeeEmail: "",
            payrollAcoount: "",
        });

        
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
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(); // 취소 된 후 페이지 reload
                        }
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
        
        // 프로필 카드 이미지 등록 함수 
        const handleImageChange = (event) => {
            console.log("handleImageChange(이미지 등록 함수) called"); 
            const file = event.target.files[0];
            if (file) {
                setSelectedImage(URL.createObjectURL(file));
            }
        };
        
        // 파일 
        const handleFileUpload = async () => {
            console.log("handleFileUpload(파일 등록 함수) called"); 
            const fileInput = document.getElementById("file-input");
            
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                console.log('file ----->', file);
                const formData = new FormData();
                formData.append("empName", employeeData.empName);
                formData.append("deptCode", employeeData.deptCode);
                formData.append("jobCode", employeeData.jobCode);
                formData.append("employeeRsdn", employeeData.employeeRsdn);
                formData.append("hireDate", employeeData.hireDate);
                formData.append("employeePhone", employeeData.employeePhone);
                formData.append("isEmployed", employeeData.isEmployed);
                formData.append("employeeGender", employeeData.employeeGender);
                formData.append("fileImgs", file);
                formData.append("employeeEmail", employeeData.employeeEmail);
                formData.append("employeeAddress", employeeData.employeeAddress); 
                formData.append("payrollAcoount", employeeData.payrollAcoount);
                
                try {
                    const response = await fetch('http://localhost:8080/api/file/register', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Accept": "*/*",
                            "Authorization" : "Bearer " + window.localStorage.getItem('ACCESS_TOKEN')
                        }
                    });
        
                    if (response.ok) {
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
            }
        };
        
        
        // 인사정보 등록
        const handleEmployeeRegistration = async () => {
            try {
        
                const response = await call('/api/employees/register', 'POST', employeeData);
                if (response) {
                    const temporaryPassword = response.data; // 응답 데이터에서 임시 비밀번호 추출
                    Swal.fire({
                        icon: 'success',
                        title: '등록 완료',
                        html: `등록이 완료되었습니다. 임시 비밀번호는 <strong>${temporaryPassword}</strong>입니다.`,
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
        
        // 입사일 
        const toggleDatePicker = () => {
            setShowDatePicker(!showDatePicker);
        };
    

    return (
        <>
                <div className="title">
                    <h3>인사카드 등록</h3>
                    <hr className="line" />
                </div>

                <div className="profile-body">

                    {/* 기본정보 */}
                    <div className="registercard">
                        <div className="employee-form1">
                            <h4 className="cardtitle">기본정보</h4>
                            {/* 이름 */}
                            <input
                                className="employee-form__input"
                                type="text"
                                placeholder="이름"
                                value={employeeData.empName}
                                onChange={(e) => {
                                    console.log("empName changed:", e.target.value);
                                    setEmployeeData({ ...employeeData, empName: e.target.value });
                                }}
                            />

                                {/* 성별 */}
                                <div className="status-dropdown3">
                                <select
                                    value={employeeData.employeeGender}
                                    onChange={(e) => setEmployeeData({ ...employeeData, employeeGender: e.target.value })}
                                >
                                    <option value="" disabled hidden>성별</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                                </div>
                                {/* 주민등록번호 */}
                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="주민등록번호"
                                value={employeeData.employeeRsdn}
                                onChange={(e) => setEmployeeData({ ...employeeData, employeeRsdn: e.target.value })}
                                />
                                {/* 이메일 */}
                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="이메일"
                                value={employeeData.employeeEmail}
                                onChange={(e) => setEmployeeData({ ...employeeData, employeeEmail: e.target.value })}
                                />
                                {/* 휴대폰 */}
                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="휴대폰"
                                value={employeeData.employeePhone}
                                onChange={(e) => setEmployeeData({ ...employeeData, employeePhone: e.target.value })}
                                />
                                {/* 주소 */}
                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="주소"
                                value={employeeData.employeeAddress}
                                onChange={(e) => setEmployeeData({ ...employeeData, employeeAddress: e.target.value })}
                                />
                                 {/* 계좌 */}
                                <input
                                className="employee-form__input"
                                type="text"
                                placeholder="급여계좌"
                                value={employeeData.payrollAccount}
                                onChange={(e) => setEmployeeData({ ...employeeData, payrollAccount: e.target.value })}
                                />

                        {/* 인사정보  */}
                        <div className="employee-form2">
                            <h4 className="cardtitle2">인사정보</h4>
                                {/* 입사일 */}
                                <div className="employee-form__input">
                                <button className="datapicker" onClick={toggleDatePicker}>
                                    입사일{employeeData.hireDate && `: ${employeeData.hireDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                                </button>   

                                {showDatePicker && (
                                <DatePicker
                                    locale={ko}
                                    document="yyyy년 MM월 dd일"
                                    selected={employeeData.hireDate}
                                    onChange={(date) => setEmployeeData({ ...employeeData, hireDate: date })}
                                    onClickOutside={toggleDatePicker}
                                    inline
                                />
                                )}
                            </div>
                                {/* 부서 */}
                                <div className="status-dropdown2">
                                    <select
                                        value={employeeData.deptCode}
                                        onChange={(e) => setEmployeeData({ ...employeeData, deptCode: e.target.value })}
                                    >
                                        <option value="" disabled hidden>부서</option>
                                        <option value="1">영업팀</option>
                                        <option value="2">마케팅팀</option>
                                        <option value="3">현장팀</option>
                                        <option value="4">고객응대팀</option>
                                        <option value="5">인사팀</option>
                                        <option value="6">총무팀</option>
                                    </select>
                                </div>
                                {/* 직위 */}
                                <div className="status-dropdown2">
                                    <select
                                        value={employeeData.jobCode}
                                        onChange={(e) => setEmployeeData({ ...employeeData, jobCode: e.target.value })}
                                    >
                                        <option value="" disabled hidden>직위</option>
                                        <option value="2">팀장</option>
                                        <option value="3">대리</option>
                                        <option value="4">사원</option>
                                    </select>
                                </div>
                        </div>


                                
                        </div>

                         {/* 프로필 이미지 */}
                        <div className="profile-image">
                            <img id="profile-img" src={selectedImage} alt="Profile Image" />
                            <div className="placeholder-text">이미지를 등록해주세요</div>
                        </div>

                        <div className="profile-buttons">
                        <button className="register-button" onClick={() => handleFileUpload()}>등록</button>
                        <button className="delete-button" onClick={() => handleAction("cancel")}>취소</button>
                        </div>
                        <input
                            type="file"
                            id="file-input"
                            className="file-input"
                            style={{ display: 'block' }} // 숨겨진 파일 선택 창
                            accept="image/*"
                            onChange={handleImageChange}
                            name="fileImage"
                        
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