import React, { Component } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';    
import ScheduleRegist from './ScheduleRegist';

class Calendar extends Component {
    state = {
        events: [],
        isModalOpen: false, // 
        newEventTitle: '', //
        selectedDate: null
    };

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/calendar');
            const eventData = response.data.data.map(e => ({
                title: e.title,
                start : e.start_date,
                end : e.end_date
            }));
            this.setState({ events: eventData });
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    }

    handleEventTitleChange = (event) => {
        this.setState({ newEventTitle: event.target.value });
    }; // 

    handleDateSelect = (arg) => {
        console.log(arg);
        this.setState({
            selectedDate: arg.start,
            isModalOpen: true
        });
    };

    handleEventSubmit = async () => {
        try{
            const newEvent = {
                title: this.state.newEventTitle,
                start_date: this.state.selectedDate,
                end_date: this.state.selectedDate
            };
        
            await axios.post('http://localhost:8080/api/v1/calendar',newEvent);
            this.closeModal();
            this.fetchEvents();
        } catch(error) {
            console.error('Error adding event:', error);
        }
    }; // 

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ 
            isModalOpen: false,
            newEventTitle: '',
            selectedDate: null 
        });
    };

    fetchEvents = async () => {
    // 이전과 동일한 fetchEvents 함수
    };

    render() {
        return (
            <div className="App">
                <button onClick={this.openModal}>Add Event</button>

                <ScheduleRegist
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    onSubmit={this.handleEventSubmit}
                    title="Add Event"
                    selectedDate={this.state.selectedDate} // 선택한 날짜 전달
                    handleEventTitleChange={this.handleEventTitleChange} // 일정 제목 변경 핸들러 전달
                />

                <FullCalendar
                    headerToolbar={{
                        start: "today prev next",
                        end : "dayGridMonth dayGridWeek dayGridDay",
                    }}
                    plugins={[dayGridPlugin]}
                    views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                    // {...this.state}
                    events={this.state.events} 
                    selectable={true}
                    navLinks={true}
                    navLinkDayClick={this.handleDateSelect}
                />
            </div>
        );
    }
}
export default Calendar;