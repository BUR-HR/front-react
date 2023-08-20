import React, { useState } from "react";
import '../../../css/employeecard.css'
import Swal from 'sweetalert2';

// 인사카드 등록 페이지
const EmployeeCard = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");

    // 프로필 카드 이미지 등록 함수 
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // 글 등록 및 취소 버튼(SweetAlert2 모듈 사용)
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
    };
    

    return (
        <section>
            <div className="body">
                <div className="title">
                    <h3>인사카드 등록</h3>
                    <hr className="line" />
                </div>

                <div className="profile-body">
                    {/* 나머지 코드 */}
                    
                    <div className="finalbutton">
                        <button className="finalbutton1" onClick={() => handleAction("confirm")}>등록</button>
                        <button className="finalbutton2" onClick={() => handleAction("cancel")}>취소</button>
                    </div>
                </div>

                {/* 스크립트 */}
                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-box">
                            <p>{confirmationText}</p>
                            <button onClick={() => handleConfirmation(true)}>확인</button>
                            <button onClick={() => handleConfirmation(false)}>취소</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EmployeeCard;