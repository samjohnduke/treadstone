import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { FileList } from "src/collections/filesList";
import { TaskList } from "src/collections/taskList";
import { Project } from "src/models/project";
import { withProject } from "src/providers/project";
import styled from "src/styled";

const ProjectContainer = styled.div`
  & h3 {
    margin-top: 50px;
    font-size: 1.3em;
  }
`;

type Props = RouteComponentProps & {
  projectId: string;
  project?: Project;
};

class ProjectPageComponent extends React.Component<Props> {
  public render() {
    const { project } = this.props;
    return project ? (
      <ProjectContainer
        style={{
          alignItems: "center",
          flex: "0 800px",
          margin: "auto",
          width: 800
        }}
      >
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>
            <a href={project.codeURL} target="_blank">
              {project.codeURL}
            </a>
          </p>
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
      </ProjectContainer>
    ) : null;
  }
}

export const ProjectPage = withProject(ProjectPageComponent);
