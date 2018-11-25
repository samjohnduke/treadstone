import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Project } from "src/models/project";
import { withProject } from "src/providers/project";

type Props = RouteComponentProps & {
  projectId: string;
  project?: Project;
};

class ProjectPageComponent extends React.Component<Props> {
  public render() {
    const { project } = this.props;
    return project ? (
      <div>
        <h2>{project.name}</h2>
      </div>
    ) : null;
  }
}

export const ProjectPage = withProject(ProjectPageComponent);
