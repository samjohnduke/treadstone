import * as React from "react";

import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import "@reach/dialog/styles.css";
import { Task } from "src/shared/tasks/models/task";
import styled from "src/styled";

export interface TaskEditorProps {
  showing: boolean;
  task: Task;
  close(): void;
}

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10000;
`;

const TaskTitle = styled.h2`
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 3px;
  margin: 0 -5px;

  &:hover {
    border: 1px solid #888;
  }
`;

export const TaskEditor = ({ showing, task, close }: TaskEditorProps) => {
  console.log(task.ref);
  return (
    <Dialog style={{ position: "relative" }} isOpen={showing}>
      <Button className="close-button" onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden={true}>×</span>
      </Button>
      <>
        <TaskTitle contentEditable={true} onChange={e => console.log(e)}>
          {task.name}
        </TaskTitle>

        <p>{task.description}</p>
        <div>
          <span>{task.estimate} hours</span>
          <span>{task.dueDate.toDate().toISOString()}</span>
          <span>{task.labels.join(", ")}</span>
          <span>{task.tags.join(", ")}</span>
        </div>
        <div>
          <h4>Checklist</h4>
          <ul>
            {task.checklist.map((c, i) => (
              <li key={`ci-${i}`}>
                <input value={c} readOnly={true} />
              </li>
            ))}
            <li>New</li>
          </ul>
        </div>
        <div>
          <h4>Comments</h4>
          <ul>
            {task.comments.map((c: any, i) => (
              <li key={`comment-${i}`}>
                {c.name} - {c.comment}
              </li>
            ))}
          </ul>
          <div>
            <textarea
              style={{ width: "100%", height: 50 }}
              placeholder="Enter a comment"
            />
            <button>Add</button>
          </div>
        </div>
      </>
    </Dialog>
  );
};
