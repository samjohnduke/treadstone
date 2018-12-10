import * as React from "react";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";

import { Task } from "src/shared/tasks/models/task";
import styled from "src/styled";

import ContentEditable from "react-contenteditable";

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
  font-size: 10px;

  background: #fff;
  border: none;
  padding: 2px;
`;

export class TaskEditor extends React.Component<TaskEditorProps> {
  public componentDidMount() {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.props.close();
      }
    });
  }

  public render() {
    const { showing, task, close } = this.props;

    return (
      <Dialog style={{ position: "relative" }} isOpen={showing}>
        <Button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <i aria-hidden={true} className="material-icons">
            close
          </i>
        </Button>
        <>
          <ContentEditable
            tagName="h2"
            onChange={(e: any) => {
              task.ref!.update({
                name: e.target.value
              });
            }}
            html={task.name}
          />

          <ContentEditable
            tagName="p"
            onChange={(e: any) => console.log(e)}
            html={task.description}
          />

          <div>
            <div>{task.estimate} hours</div>
            <div>{task.dueDate.toDate().toISOString()}</div>
            <div>{task.labels.join(", ")}</div>
            <div>{task.tags.join(", ")}</div>
          </div>

          <div>
            <h4>Checklist</h4>
            <ul>
              {task.checklist.map((c, i) => (
                <li key={`ci-${i}`}>
                  <input type="checkbox" />
                  <ContentEditable
                    onChange={(e: any) => console.log(e)}
                    html={c}
                  />
                  <a href="#">
                    <i className="material-icons">close</i>
                  </a>
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
  }
}
