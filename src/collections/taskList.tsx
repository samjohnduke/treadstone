import * as React from "react";
import { Task } from "src/models/task";

type TaskOrPromise = Task | Promise<Task>;

interface Props {
  tasks: TaskOrPromise[];
}

interface State {
  tasks: Array<Task | undefined>;
  awaiting: Array<Promise<void> | undefined>;
}

const isTask = (task: object): task is Task => {
  return task instanceof Task;
};

const isPromise = (task: object): task is Promise<Task> => {
  return task instanceof Promise;
};

const isFulfilled = (all: any[]): all is Task[] => {
  return all.every(isTask);
};

export class TaskList extends React.Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      awaiting: new Array(props.tasks.length).fill(undefined),
      tasks: new Array(props.tasks.length).fill(undefined)
    };

    let tasks = props.tasks;
    if (!isFulfilled(tasks)) {
      tasks = tasks.map((task, i) => {
        if (isPromise(task)) {
          const p = task.then(t => {
            const newTasks = this.state.tasks.slice(0);
            newTasks[i] = t;
            const pl = this.state.awaiting.slice(0);
            pl[i] = undefined;
            this.setState({ tasks: newTasks });
          });
          this.state.awaiting[i] = p;
        } else {
          this.state.tasks[i] = task;
        }

        return task;
      });
    } else {
      this.state.tasks = tasks;
    }
    console.log(this.state.tasks);
  }

  public render() {
    return (
      <ul>
        {this.state.tasks.map((t, i) => (
          <li key={i}>{t ? t.name : "loading"}</li>
        ))}
      </ul>
    );
  }
}
