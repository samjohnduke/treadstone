import * as React from "react";
import { Task, TaskStore } from "src/shared/tasks/models/task";

interface Provi {
  map: { [key: string]: Task };
  list: Task[];
}

export const TaskContext = React.createContext<Provi>({ list: [], map: {} });

interface InterfaceProps {
  userId: string;
  children: React.ReactNode;
}

interface InterfaceState {
  list: Task[];
  map: { [key: string]: Task };
}

export class TaskProvider extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private pjs: any;

  constructor(props: any) {
    super(props);

    this.pjs = TaskStore(this.props.userId);

    this.state = {
      list: [],
      map: {}
    };
  }

  public componentDidMount() {
    this.pjs.changes(() =>
      this.setState({
        list: Object.keys(this.pjs.getState().tasks).map(
          k => this.pjs.getState().tasks[k]
        ),
        map: this.pjs.getState().tasks
      })
    );
  }

  public componentWillUnmount() {
    this.pjs.close();
  }

  public render() {
    return (
      <TaskContext.Provider value={this.state}>
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

interface TaskListProps {
  list: any[];
}

export function withTaskCollection<T extends TaskListProps>(
  Component: React.ComponentType<T>
) {
  function TaskConsumer(props: T) {
    return (
      <TaskContext.Consumer>
        {store => {
          return <Component {...props} list={store.list} />;
        }}
      </TaskContext.Consumer>
    );
  }

  return TaskConsumer;
}

interface TaskProps {
  taskId: string;
  task?: Task;
}

export function withTask<T extends TaskProps>(
  Component: React.ComponentType<T>
) {
  function TaskConsumer(props: T) {
    return (
      <TaskContext.Consumer>
        {store => {
          return <Component {...props} task={store.map[props.taskId]} />;
        }}
      </TaskContext.Consumer>
    );
  }

  return TaskConsumer;
}
