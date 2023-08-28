import React from 'react';
import DatePicker from 'react-datepicker';
import Toggle from 'react-toggle';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toggle/style.css';

const ScheduleRegist = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    eventTitle,
    handleEventTitleChange,
    selectedStartDate,
    handleStartDateChange,
    selectedEndDate,
    handleEndDateChange,
    eventLocation,
    handleEventLocationChange,
    eventCategory,
    handleEventCategoryChange,
    showCategories,
    handleToggleCategories
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>{title}</h2>
                <div className="modal-inputs">
                    <input
                        type="text"
                        placeholder="Event title"
                        value={eventTitle}
                        onChange={handleEventTitleChange}
                    />
                    <DatePicker
                        selected={selectedStartDate}
                        onChange={handleStartDateChange}
                        placeholderText="시작 날짜"
                    />
                    <DatePicker
                        selected={selectedEndDate}
                        onChange={handleEndDateChange}
                        placeholderText="종료 날짜"
                    />
                    <input
                        type="text"
                        placeholder="장소"
                        value={eventLocation}
                        onChange={handleEventLocationChange}
                    />
                    <div>
                        <button onClick={handleToggleCategories}>분류 선택</button>
                        {showCategories && (
                            <select value={eventCategory} onChange={handleEventCategoryChange}>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="modal-buttons">
                    <button onClick={onSubmit}>등록</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleRegist;
