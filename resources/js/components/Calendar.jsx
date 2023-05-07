import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get('/api/tasks');
      const data = response.data;
      const mappedData = data.map(task => ({
        start: moment(task.start_date).toDate(),
        end: moment(task.end_date).toDate(),
        title: task.title,
      }));
      setEvents(mappedData);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}

export default CalendarComponent;
