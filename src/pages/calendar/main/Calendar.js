import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';
import ScheduleRegist from './ScheduleRegist';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ScheduleRegist.css';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [eventLocation, setEventLocation] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        // 데이터 초기화 및 API 호출 로직
    }, []);

    const handleDateSelect = (arg) => {
        setSelectedDate(arg.start);
        setIsModalOpen(true);
        setNewEventTitle('');
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setEventLocation('');
        setEventCategory('');
        setShowCategories(false);
    };

    const handleEventSubmit = async () => {
        try {
            const newEvent = {
                title: newEventTitle,
                start_date: selectedStartDate,
                end_date: selectedEndDate,
                location: eventLocation,
                category: eventCategory,
            };

            await axios.post('http://localhost:8080/api/v1/calendar', newEvent);
            closeModal();
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewEventTitle('');
        setSelectedDate(null);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setEventLocation('');
        setEventCategory('');
        setShowCategories(false);
    };

    const fetchEvents = async () => {
        // 이전과 동일한 fetchEvents 함수
    };

    return (
        <div className="App">
            <FullCalendar
                headerToolbar={{
                    start: 'today prev next',
                    center: 'title',
                    end: 'dayGridMonth dayGridWeek dayGridDay',
                }}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth" // 초기에 보여줄 뷰 설정
                views={{
                    dayGridMonth: {}, // 월별 뷰
                    dayGridWeek: {},  // 주간 뷰
                    dayGridDay: {},   // 일간 뷰
                }}
                events={events}
                selectable={true}
                navLinks={true}
                navLinkDayClick={handleDateSelect}
            />

            <ScheduleRegist
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleEventSubmit}
                title="일정 등록"
                eventTitle={newEventTitle}
                handleEventTitleChange={(event) => setNewEventTitle(event.target.value)}
            >
                {/* 추가 입력 필드 */}
                <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    placeholderText="시작 날짜"
                />
                <DatePicker
                    selected={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    placeholderText="종료 날짜"
                />
                <input
                    type="text"
                    placeholder="장소"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                />
                <div>
                    <button onClick={() => setShowCategories(!showCategories)}>분류 선택</button>
                    {showCategories && (
                        <select value={eventCategory} onChange={(event) => setEventCategory(event.target.value)}>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            {/* 추가 분류 옵션 */}
                        </select>
                    )}
                </div>

                <div className="modal-buttons">
                    <button onClick={handleEventSubmit}>등록</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </ScheduleRegist>
        </div>
    );
}

export default Calendar;
