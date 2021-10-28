export function getAppointmentsForDay(state, day) {
  // find obj in state.days array who's name matches the provided day
  const filteredAppointments = state.days.filter((days) => days.name === day);
  if (!filteredAppointments.length) {
    return [];
  }

  // iterate through arr, comparing where it's id matches the id of states.appointments and return that value
  const appointmentIds = filteredAppointments[0].appointments;

  return appointmentIds.map((id) => state.appointments[id]);
}
