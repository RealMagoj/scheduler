import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const {time, interviewers, interview, bookInterview, cancelInterview, id} = props;
  const CREATE = 'CREATE';
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    });
  };

  const deleteInterview = () => {
    transition(DELETING);
    cancelInterview(id, interview)
    .then(() => {
      transition(EMPTY);
    });
  }
  
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() =>back()}
          onConfirm={deleteInterview}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}