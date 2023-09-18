import React, { useCallback, useEffect, useRef, useState } from "react";
import readXlsxFile from "read-excel-file";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../apis/config";
import popup from "./popup.module.css";

const PaymentModal = ({ isOpen, paymentType, modalCloseHandler, setPayrollList }) => {
    const [files, setFiles] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);
    let url = null;

    if (paymentType === "급여") url = "payroll";
    else url = "severance";

    const resetUploadStatus = () => {
        if (dragRef.current) {
            dragRef.current.classList = popup.upload;
        }
    };

    const clickHandler = () => {
        setFiles(null);
        setIsDragging(false);
        resetUploadStatus();
        modalCloseHandler();
    };

    const handleDragIn = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOut = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        resetUploadStatus();
    }, []);

    const handleDragOver = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isDragging) return;

            if (e.dataTransfer?.files) {
                setIsDragging(true);
            }

            if (e.dataTransfer?.items[0].type.includes("spreadsheet")) {
                dragRef.current.classList.add(popup.active);
            } else {
                dragRef.current.classList.add(popup.fail);
            }
        },
        [isDragging]
    );

    const onChangeFiles = useCallback(async (e) => {
        resetUploadStatus();
        let selectFile = null;

        if (e.type === "drop") {
            selectFile = e.dataTransfer.files;
        } else {
            selectFile = e.target.files;
        }

        if (!selectFile || selectFile.length === 0) {
            return;
        }

        const selectedFileType = selectFile[0].type;

        if (!selectedFileType.includes("spreadsheet")) {
            Swal.fire({
                icon: "error",
                text: "xlsx 파일만 등록해주세요",
            });

            dragRef.current.classList.add(popup.fail);
            setFiles(null);

            return;
        }

        dragRef.current.classList.add(popup.active);
        setFiles(selectFile);
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();

            onChangeFiles(e);
            setIsDragging(false);
        },
        [onChangeFiles]
    );

    const onSubmitHandle = async (e) => {
        e.preventDefault();

        if (!files) {
            Swal.fire({
                icon: "error",
                text: "파일을 등록해주세요",
            });
            return;
        }

        const data = new FormData(e.target);
        for (let pair of data) {
            console.log(pair);
        }

        const map = {
            empNo: "empNo",
        };

        const excelData = await readXlsxFile(files[0], { map }).then(
            ({ rows }) => rows
        );

        excelData.forEach((item) => data.append("empNo", item.empNo));

        const result = await fetch(`${API_BASE_URL}/api/v1/pay/${url}`, {
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
            },
            body: data,
        });

        if (result.ok) {
            setFiles(null);
            setIsDragging(false);
            resetUploadStatus();
            modalCloseHandler();
        }

        const list = await result.json();
        setPayrollList(list);
    };

    useEffect(() => {
        const dragRefCurrent = dragRef.current;

        if (dragRefCurrent) {
            dragRefCurrent.addEventListener("dragenter", handleDragIn);
            dragRefCurrent.addEventListener("dragleave", handleDragOut);
            dragRefCurrent.addEventListener("dragover", handleDragOver);
            dragRefCurrent.addEventListener("drop", handleDrop);
        }

        return () => {
            if (dragRefCurrent) {
                dragRefCurrent.removeEventListener("dragenter", handleDragIn);
                dragRefCurrent.removeEventListener("dragleave", handleDragOut);
                dragRefCurrent.removeEventListener("dragover", handleDragOver);
                dragRefCurrent.removeEventListener("drop", handleDrop);
            }
        };
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    return (
        <div
            className={popup.popup}
            style={isOpen ? { display: "block" } : { display: "none" }}
        >
            <h2>{paymentType} 대장 추가</h2>
            <form onSubmit={onSubmitHandle} className={popup.form}>
                <div className={popup.formItem}>
                    <span className={popup.require}>대장명칭</span>
                    <input type="text" id="name" name="name" />
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>{paymentType} 기준일</span>
                    <div style={{ display: "inline-flex" }}>
                        <input
                            type="date"
                            id="salaryBaseStartDate"
                            name="salaryBaseStartDate"
                            required
                        />
                        &nbsp;~&nbsp;
                        <input
                            type="date"
                            id="salaryBaseEndDate"
                            name="salaryBaseEndDate"
                            required
                        />
                    </div>
                </div>
                <div className={popup.formItem}>
                    <span className={popup.require}>구분</span>
                    <select name="paymentType" required>
                        <option value=""></option>
                        <option value={paymentType}>{paymentType}</option>
                        {paymentType === "퇴직금" ? (
                            <option value="중간정산">중간정산</option>
                        ) : null}
                    </select>
                </div>
                <span className={`${popup.require} ${popup.formItem}`}>
                    대상자 업로드
                </span>
                <label htmlFor="upload" className={popup.upload} ref={dragRef}>
                    <>
                        <img
                            src="/common/images/microsoft-excel.svg"
                            alt=""
                            style={{ width: 40, height: 40 }}
                        />
                        {files?.item(0).type.includes("spreadsheet") ? (
                            <span style={{ textAlign: "center" }}>
                                파일 업로드 완료
                                <br />
                                {files[0].name}
                            </span>
                        ) : (
                            <span style={{ textAlign: "center" }}>
                                엑셀(*.xlsx) 파일 드래그
                                <br />
                                또는 업로드 (필수)
                            </span>
                        )}
                    </>
                </label>
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="upload"
                    onChange={onChangeFiles}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    name="file"
                />
                <div className={popup.formItem}>
                    <span className={popup.require}>지급예정일</span>
                    <input
                        type="date"
                        name="paymentScheduledDate"
                        className="paymentScheduledDate"
                    />
                </div>
                <div className={popup.formItem}>
                    <button className={popup.btn}>추가</button>
                    <button
                        type="reset"
                        className={popup.btn}
                        onClick={clickHandler}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentModal;
