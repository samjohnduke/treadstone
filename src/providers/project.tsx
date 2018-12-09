import * as React from "react";
import { Project, ProjectStore } from "src/apps/projects/models/project";

interface Provi {
  map: { [key: string]: Project };
  list: Project[];
}

export const ProjectContext = React.createContext<Provi>({ list: [], map: {} });

interface InterfaceProps {
  children: React.ReactNode;
}

interface InterfaceState {
  list: Project[];
  map: { [key: string]: Project };
}

export class ProjectProvider extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private pjs: typeof ProjectStore;

  constructor(props: any) {
    super(props);

    this.pjs = ProjectStore;

    this.state = {
      list: [],
      map: {}
    };
  }

  public componentDidMount() {
    this.pjs.changes(() =>
      this.setState({
        list: Object.keys(this.pjs.getState().projects).map(
          k => this.pjs.getState().projects[k]
        ),
        map: this.pjs.getState().projects
      })
    );
  }

  public componentWillUnmount() {
    this.pjs.close();
  }

  public render() {
    return (
      <ProjectContext.Provider value={this.state}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}

interface ProjectListProps {
  list: any[];
}

export function withProjectCollection<T extends ProjectListProps>(
  Component: React.ComponentType<T>
) {
  function ProjectConsumer(props: T) {
    return (
      <ProjectContext.Consumer>
        {store => {
          return <Component {...props} list={store.list} />;
        }}
      </ProjectContext.Consumer>
    );
  }

  return ProjectConsumer;
}

interface ProjectProps {
  projectId: string;
  project?: Project;
}

export function withProject<T extends ProjectProps>(
  Component: React.ComponentType<T>
) {
  function ProjectConsumer(props: T) {
    return (
      <ProjectContext.Consumer>
        {store => {
          return <Component {...props} project={store.map[props.projectId]} />;
        }}
      </ProjectContext.Consumer>
    );
  }

  return ProjectConsumer;
}
