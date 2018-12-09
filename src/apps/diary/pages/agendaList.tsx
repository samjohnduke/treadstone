import { navigate, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Task } from "src/shared/tasks/models/task";
import { withTaskCollection } from "src/shared/tasks/providers/tasks";
import styled from "src/styled";

interface Props {
  list: Task[];
}

const List = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

const TaskDetails = styled("div")`
  padding: 20px;
  background: #fff;
  box-shadow: 4px 4px 20px -4px rgba(100, 100, 100, 0.15);
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.96);
  }
`;

const Pa = styled("div")`
  display: flex;

  & aside {
    flex: 0 0 200px;
  }
`;

type PLProps = Props & RouteComponentProps;

class TasksListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <Pa>
        <List>
          {this.props.list.map(p => (
            <TaskDetails
              key={p.name}
              onClick={() => navigate(`./tasks/${p.key}`)}
            >
              <h3>{p.name}</h3>
              <div>{p.description}</div>
              <div>{p.tags.join(", ")}</div>
            </TaskDetails>
          ))}
        </List>
      </Pa>
    );
  }
}

export const TasksList = withTaskCollection<PLProps>(TasksListComponent);
