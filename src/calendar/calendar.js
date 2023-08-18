import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';    

class Calendar extends Component {
    render() {
        return (
            <div className="App">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[
                        { title: '방배동 신라빌딩 작업', date: '2023-08-18'},
                        { title: '사당동 삼송빌딩 작업', date: '2023-08-31'}
                    ]}
                />
            </div>
        );
    }
}
export default Calendar;