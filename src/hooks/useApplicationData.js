import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers : {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(
      `/api/appointments/${id}`,
      {interview}
    ).then(() => {
      setState((prev) => ({...prev, appointments}));
      updateSpots(id);
    });
  };
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(
      `/api/appointments/${id}`
    ).then(() => {
      setState((prev) => ({...prev, appointments}));
      updateSpots(id);
    });
  };

  const updateSpots = (id) => {
    const selectedDay = state.days.filter((day) => {
      return day.name === state.day;
    })[0];
    const appointment = state.appointments[id];
    if (appointment.interview === null) {
      selectedDay.spots -= 1;
    } else  {
      selectedDay.spots += 1;
    }
    state.days[selectedDay.id - 1] = selectedDay;
    const days = state.days;
    setState((prev) => ({...prev, days}));
  };
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}