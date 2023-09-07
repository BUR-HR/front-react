import { useState } from "react";
import '../../../../css/employeecard.css';
import Swal from 'sweetalert2';
import NavBar from "../../../../common/component/NavBar"; 
import EmployeecardNav from "../nav/EmployeecardNav"; 
import { login, call } from "../../../../apis/service";
import { useNavigate } from 'react-router-dom'; 
import DatePicker from "react-datepicker";
import ko from 'date-fns/locale/ko';
import DaumPostcode from 'react-daum-postcode';
import '../../../../css/post.css';
import AddressSearch  from "../../../../apis/address"; 


    // 인사카드 등록 페이지
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
            payrollAcoount: "",
            employeeStatus:null,
            bank:"",
        });

        const [popup, setPopup] = useState(false);

        // 글 등록 및 취소 함수 ( SweetAlert2 모듈 사용)
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
        
// 파일 등록 함수 
const handleFileUpload = async () => {
    const fileInput = document.getElementById("file-input");
    console.log("파일등록함수 호출");

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // FormData를 사용하여 파일과 다른 데이터를 함께 전송
        const formData = new FormData();
        formData.append("fileImgs", file);

        try {
            const response = await fetch('http://localhost:8080/api/file/fileimgs', {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem('ACCESS_TOKEN')
                }
            }).then(res => res.json());

            if (response?.status === 200) {
                // 파일 업로드 성공
                console.log("파일 업로드 성공");
            } else {
                // 파일 업로드 실패
                console.error("파일 업로드 실패");
            }

        } catch (error) {
            console.error("파일 업로드 중 오류 발생:", error);
        }
    }
};

        
        
        // 인사정보 등록 함수 
        const handleEmployeeRegistration = async () => {
            const fileInput = document.getElementById("file-input");
            
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                console.log('file ----->', file);
                const formData = new FormData();
                console.log('---',employeeData);
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
                formData.append("bank", employeeData.bank);
                console.log('------> ', formData);
                try {
                    const response = await fetch('http://localhost:8080/api/file/register', {
                        
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Accept": "*/*",
                            "Authorization" : "Bearer " + window.localStorage.getItem('ACCESS_TOKEN')
                        }
                    }).then(res => res.json());
        
                    if (response?.status === 200) {
                        const temporaryPassword = response.data.tempPass;
                        const empNo = response.data.empNo;

                        await sendEmail(employeeData.employeeEmail, temporaryPassword, empNo); // 메일 보내기 
                    
                        Swal.fire({
                            icon: 'success',
                            title: '등록 완료',
                            text: '직원의 이메일로 계정정보가 전송되었습니다.'
                        });
                    
                        console.log(response);
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

        // 메일 보내기 함수
        const sendEmail = async (to, temporaryPassword, empNo) => {
            const subject = "사원의 아이디 정보입니다";
            const text = `안녕하세요,\n\n사원의 아이디 정보입니다:\n\n임시 비밀번호: ${temporaryPassword}\n사원 번호: ${empNo}\n\n로그인 후 비밀번호를 변경해주세요.`;
        
            try {
            const response = await fetch('http://localhost:8080/api/file/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                to,
                subject,
                text,
                }),
            });
        
            if (response.ok) {
                console.log('이메일 전송 성공');
            } else {
                console.error('이메일 전송 실패');
            }
            } catch (error) {
            console.error('이메일 전송 중 오류 발생:', error);
            }
        };
        
        
        // 입사일 달력 함수 
        const toggleDatePicker = () => {
            setShowDatePicker(!showDatePicker);
        };

        const handleAddressComplete = (address) => {
            setEmployeeData({
                ...employeeData,
                employeeAddress: address,
            });
        };
    
        const complete = (data) => {
            let fullAddress = data.address;
            let extraAddress = '';
    
            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
    
            setEmployeeData({
                ...employeeData,
                employeeAddress: fullAddress,
            });
    
            setPopup(!popup);
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
                        placeholder="주민등록번호 (000000-0000000)"
                        value={employeeData.employeeRsdn}
                        maxLength="14" // 최대 길이 제한
                        onChange={(e) => {
                            const input = e.target.value;
                            const formattedInput = input.replace(/[^0-9-]/g, ''); // 숫자와 - 이외의 문자 제거

                            if (formattedInput.length > 6 && formattedInput.charAt(6) !== '-') {
                                // 입력된 문자열이 7자리 이상이고, 7번째 문자가 - 가 아니라면 - 추가
                                const truncatedInput = formattedInput.slice(0, 6) + '-' + formattedInput.slice(6);
                                setEmployeeData({ ...employeeData, employeeRsdn: truncatedInput });
                            } else {
                                setEmployeeData({ ...employeeData, employeeRsdn: formattedInput });
                            }
                        }}
                        />
                        {/* 이메일 */}
                        <input
                        className="employee-form__input"
                        type="text"
                        placeholder="이메일"
                        value={employeeData.employeeEmail}
                        onChange={(e) => setEmployeeData({ ...employeeData, employeeEmail: e.target.value })}
                        onBlur={(e) => {
                            const input = e.target.value;
                            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

                            if (input && !emailPattern.test(input)) {
                                Swal.fire({
                                    icon: 'error',
                                    title: '유효하지 않은 이메일 형식',
                                    text: '유효하지 않은 이메일 형식입니다.',
                                });
                            }
                        }}
                        />
                        {/* 휴대폰 */}
                        <input
                        className="employee-form__input"
                        type="text"
                        placeholder="휴대폰 번호 (000-0000-0000)"
                        value={employeeData.employeePhone}
                        maxLength="13" // 최대 길이 제한
                        onChange={(e) => {
                            const input = e.target.value;
                            const formattedInput = input.replace(/[^0-9-]/g, ''); // 숫자와 - 이외의 문자 제거

                            if (formattedInput.length > 3 && formattedInput.charAt(3) !== '-') {
                                // 입력된 문자열이 4자리 이상이고, 4번째 문자가 - 가 아니라면 - 추가
                                const truncatedInput = formattedInput.slice(0, 3) + '-' + formattedInput.slice(3);
                                setEmployeeData({ ...employeeData, employeePhone: truncatedInput });
                            } else if (formattedInput.length > 8 && formattedInput.charAt(8) !== '-') {
                                // 입력된 문자열이 9자리 이상이고, 9번째 문자가 - 가 아니라면 - 추가
                                const truncatedInput = formattedInput.slice(0, 8) + '-' + formattedInput.slice(8);
                                setEmployeeData({ ...employeeData, employeePhone: truncatedInput });
                            } else {
                                setEmployeeData({ ...employeeData, employeePhone: formattedInput });
                            }
                        }}
                        />
                        {/* 주소 */}
                        <AddressSearch employeeData={employeeData} onComplete={handleAddressComplete} />
                        {/* 은행  */}
                        <input
                        className="employee-form__input"
                        type="text"
                        placeholder="은행"
                        value={employeeData.bank}
                        onChange={(e) => setEmployeeData({ ...employeeData, bank: e.target.value })}
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
                            <div className="hiredate">
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
                    {selectedImage ? (
                        <img
                            id="profile-img"
                            src={selectedImage}
                            alt="Profile Image"
                            style={{
                                maxWidth: "100%", 
                                maxHeight: "100%", 
                            }}
                        />
                    ) : (
                        <div className="placeholder-text">이미지를 등록해주세요</div>
                    )}
                    </div>

                    {/* 파일선택 */}
                    <input
                        type="file"
                        id="file-input"
                        className="file-input"
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