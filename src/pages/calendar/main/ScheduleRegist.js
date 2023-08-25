import React from 'react';

const ScheduleRegist = ({ isOpen, onClose, onSubmit, title, selectedDate, handleEventTitleChange }) => {
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
                        value={title}
                        onChange={handleEventTitleChange}
                    />
                    <input
                        type="text"
                        placeholder="Event location"
                        // Add other input fields for classification, location, description, etc.
                    />
                    {/* Add more input fields as needed */}
                </div>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ScheduleRegist;
