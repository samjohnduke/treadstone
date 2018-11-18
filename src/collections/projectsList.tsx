import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Project } from "src/models/project";
import { withProjectCollection } from "src/providers/project";

interface Props {
  list: Project[];
}

type PLProps = Props & RouteComponentProps;

class ProjectsListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <ul>
        {this.props.list.map(p => (
          <li key={p.name}>
            <Link to={p.key}>{p.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export const ProjectsList = withProjectCollection<PLProps>(
  ProjectsListComponent
);
