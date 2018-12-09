import * as React from "react";
import { TaskEditor } from "src/shared/tasks/components/taskEditor";
import { Task } from "src/shared/tasks/models/task";
import styled from "src/styled";

const Item = styled.li`
  background: #fff;
  display: flex;
  box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
  align-items: center;

  & input {
    flex: 0;
    margin: 10px 15px;
  }

  & a {
    flex: 1;
    display: block;
    padding: 10px 15px;
    cursor: pointer;
  }
`;

interface ListElementProps {
  task: Task;
}

export class ListElement extends React.Component<ListElementProps> {
  public state = { open: false };

  public render() {
    const { task } = this.props;
    return (
      <>
        <Item tabIndex={0}>
          <input type="checkbox" />
          <a onClick={() => this.setState({ open: true })}>
            <span>{task.name}</span>
            <span>{task.description}</span>
          </a>
          <span>{task.dueDate.toDate().toISOString()}</span>
        </Item>
        <TaskEditor
          task={task}
          showing={this.state.open}
          close={() => {
            this.setState({ open: false });
          }}
        />
      </>
    );
  }
}
