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
    return <h2>Project: {this.props.project!.name}</h2>;
  }
}

export const ProjectPage = withProject(ProjectPageComponent);
