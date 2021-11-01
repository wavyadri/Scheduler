import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

// PROPS
// id
// timeappointment
// interview
// bookInterview

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const destroy = (id) => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === DELETING && <Status message={'Deleting...'} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={destroy} />}
      {mode === ERROR_SAVE && (
        <Error message='Error! Could not book appointment.' onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Error! Could not cancel appointment.' onClose={back} />
      )}
    </article>
  );
}
