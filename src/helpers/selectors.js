export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  const selectedDay = state.days.filter(stateDay => {
    return stateDay.name === day;
  })[0];
  selectedDay && selectedDay.appointments.map(appointment => {
    return appointmentsArray.push(state.appointments[appointment]);
  });
  return appointmentsArray;
};

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  const selectedDay = state.days.filter(stateDay => {
    return stateDay.name === day;
  })[0];
  selectedDay && selectedDay.interviewers.map(interviewer => {
    return interviewersArray.push(state.interviewers[interviewer]);
  });
  return interviewersArray;
};

export function getInterview(state, interview) {
  return interview ? 
    {...interview, interviewer: state.interviewers[interview.interviewer]} : null;
};