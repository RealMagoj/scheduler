import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const {interviewers, interviewer, setInterviewer} = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((item) => {
          return (
            <InterviewerListItem 
              id={item.id}
              avatar={item.avatar}
              name={item.name}
              selected={interviewer === item.id}
              setInterviewer={item.setInterviewer}
            />
          );
        })}
      </ul>
    </section>
  );
}