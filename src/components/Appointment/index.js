import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const {time, interview} = props;
  const CREATE = 'CREATE';
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onSave={() => console.log('SAVE')}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}