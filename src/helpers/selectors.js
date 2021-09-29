export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  const selectedDay = state.days.find(stateDay => {
    return stateDay.name === day;
  });
  selectedDay && selectedDay.appointments.map(appointment => {
    return appointmentsArray.push(state.appointments[appointment]);
  });
  return appointmentsArray;
};

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  const selectedDay = state.days.find(stateDay => {
    return stateDay.name === day;
  });
  selectedDay && selectedDay.interviewers.map(interviewer => {
    return interviewersArray.push(state.interviewers[interviewer]);
  });
  return interviewersArray;
};

export function getInterview(state, interview) {
  return interview ? 
    {...interview, interviewer: state.interviewers[interview.interviewer]} : null;
};