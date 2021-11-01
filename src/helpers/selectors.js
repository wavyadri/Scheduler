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

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter((days) => days.name === day);
  if (!filteredInterviewers.length) {
    return [];
  }

  const interviewerIds = filteredInterviewers[0].appointments;

  return interviewerIds.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }

  return null;
}
