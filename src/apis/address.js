// address.js

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../css/post.css';

const handleInput = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
        ...employeeData,
        [name]: value,
    });
};


const handleComplete = (data) => {
    setPopup(!popup);
};
const AddressSearch = ({ employeeData, onComplete }) => {
    const [popup, setPopup] = useState(false);

    const handleComplete = (data) => {
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

        onComplete(fullAddress);

        setPopup(!popup);
    };

    return (
        <div className="address_search">
            {/* 주소 */}
            <input
                className="addressform"
                type="text"
                placeholder="주소"
                name="employeeAddress"
                value={employeeData.employeeAddress}
                readOnly
            />
            <button onClick={() => setPopup(true)} className="address">우편번호 찾기</button>
            {popup && (
                <div className="postmodal">
                    <DaumPostcode
                        autoClose
                        onComplete={handleComplete}
                    />
                    <button onClick={() => setPopup(false)} className="address2" >닫기</button>
                </div>
            )}
        </div>
    );
};

export default AddressSearch; 