import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

// PROPS from EDIT
// student:String
// interviewer:Number
// interviewers:Array
// onSave:Function
// onCancel:Function

// PROPS from CREATE
// interviewers:Array
// onSave:Function
// onCancel:Function

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewerId(null);
  };

  const handleCancel = () => {
    reset();
    props.onCancel();
  };

  const handleSave = () => {
    props.onSave(student, interviewerId);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewerId}
          onChange={setInterviewerId}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>
          <Button confirm onClick={handleSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
