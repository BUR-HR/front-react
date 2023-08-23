import React, { Component } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';    

class Calendar extends Component {
    state = {
        events: []
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

    render() {
        return (
            <div className="App">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    {...this.state}
                />
            </div>
        );
    }
}
export default Calendar;