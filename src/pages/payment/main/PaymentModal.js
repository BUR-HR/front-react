import React from "react";
import popup from "./popup.module.css";

const PaymentModal = ({ isOpen, PaymentType }) => {
    if (!isOpen) return null;

    const onSubmitHandle = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
    };

    return (
        <div className={popup.popup}>
            <h2>퇴직금 대장 추가</h2>
            <form onSubmit={onSubmitHandle} className={popup.form}>
                <div className={popup.formItem}>
                    <span className={popup.require}>대장명칭</span>
                    <input type="text" id="name" name="name" />
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>퇴직금 기준일</span>
                    <input type="date" id="start_date" name="start_date" />
                    ~
                    <input type="date" id="end_date" name="end_date" />
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>퇴직금 구분</span>
                    <input type="text" />
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>대상자 업로드</span>
                    <input type="text" />
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>지급예정일</span>
                    <input type="text" />
                </div>
                <div className={popup.formItem + popup.btn}></div>
            </form>
        </div>
    );
};

export default PaymentModal;
