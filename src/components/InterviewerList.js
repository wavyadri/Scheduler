// PROPS
// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
// interviewer:number - a number that represents the id of the currently selected interviewer
import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
