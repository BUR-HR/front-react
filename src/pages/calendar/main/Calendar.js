import React, { Component } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';    

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
                    headerToolbar={{
                        start: "today prev next",
                        end : "dayGridMonth dayGridWeek dayGridDay",
                    }}
                    plugins={[dayGridPlugin]}
                    views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                    {...this.state}
                />
            </div>
        );
    }
}
export default Calendar;