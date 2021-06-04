export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  const selectedDay = state.days.filter(stateDay => {
    return stateDay.name === day;
  })[0];
  selectedDay && selectedDay.appointments.map(appointment => {
    appointmentsArray.push(state.appointments[appointment]);
  });
  return appointmentsArray;
}