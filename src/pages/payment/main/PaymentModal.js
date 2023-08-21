import React from "react";
import popup from './popup.module.css';

const PaymentModal = ({ isOpen, workType }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className={popup['work-popup']}>
                    <img className={popup.circle} src='/common/images/Ellipse.svg' alt='' />
                    <img className={popup.check} src='/common/images/check.png' alt="" />
                    <span className={popup['popup-text']}>
                    {(workType === '출근') ? '출근 처리가 완료되었습니다.' : '퇴근 처리가 완료되었습니다.'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
