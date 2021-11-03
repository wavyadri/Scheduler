import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (id, state, delta) => {
    return state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: day.spots + delta };
      }
      return day;
    });
  };

  // const updateSpots = (state, appointments, id) => {
  //   // find day obj
  //   const day = state.days.find((d) => d.name === state.day);

  //   let spots = 0;
  //   // iterate id's -> get appt obj
  //   for (const id of day.appointments) {
  //     const appointment = appointments[id];

  //     if (!appointment.interview) {
  //       spots++;
  //     }
  //   }

  //   const newDay = { ...day, spots };

  //   const mewDays = state.days.map((day) =>
  //     day.name === state.day ? newDay : day
  //   );
  //   return newDays;
  // };

  const bookInterview = (id, interview) => {
    const isEdit = state.appointments[id].interview !== null;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, state, isEdit ? 0 : -1);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, state, 1);

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
