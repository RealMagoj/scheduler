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
      const newState = {...state, appointments};
      setState(updateSpots(newState));
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
      const newState = {...state, appointments};
      setState(updateSpots(newState));
    });
  };

  const updateSpots = (state) => {
    const givenDay = state.day;
    const dayToUpdate = state.days.find(day => day.name === givenDay);
    const dayToUpdateIndex = state.days.findIndex(day => day.name === givenDay);
    const listOfAppointmentIds = dayToUpdate.appointments;
    const spots = listOfAppointmentIds.filter(apptId => state.appointments[apptId].interview === null).length;
    const updatedDay = {...dayToUpdate, spots};
    const updatedDays = [...state.days];
    
    updatedDays[dayToUpdateIndex] = updatedDay;
    
    return {...state, days: updatedDays};
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