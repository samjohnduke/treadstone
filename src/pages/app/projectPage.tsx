import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { FileList } from "src/collections/filesList";
import { TaskList } from "src/collections/taskList";
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
      <>
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>{project.codeURL}</p>
        </div>
        <div>
          <h3>Tasks</h3>
          <div>{project.tasks ? <TaskList tasks={project.tasks} /> : null}</div>
        </div>
        <div>
          <h3>Files</h3>
          <div>{project.files ? <FileList files={project.files} /> : null}</div>
        </div>
        <div>
          <h3>Documentation</h3>
        </div>
        <div>
          <h3>Notes</h3>
        </div>
      </>
    ) : null;
  }
}

export const ProjectPage = withProject(ProjectPageComponent);
