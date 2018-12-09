import * as React from "react";
import { Async } from "src/components/async";
import { Task } from "src/shared/tasks/models/task";
import styled from "src/styled";

import { ListElement } from "src/shared/tasks/components/listElement";

interface Props {
  tasks: Array<Promise<Task>>;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;

  & li {
    background: #fff;
    display: flex;
    box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
  }

  & input {
    flex: 0;
    margin: 10px 15px;
  }

  & a {
    flex: 1;
    display: block;
    padding: 10px 15px;
  }
`;

export class TaskList extends React.Component<Props> {
  public render() {
    const { tasks } = this.props;
    return (
      <>
        <List>
          {tasks.map((t, i) => (
            <Async<Task> promise={t} key={i}>
              {val => <ListElement task={val} />}
            </Async>
          ))}
        </List>
        <a>View all</a>
      </>
    );
  }
}
