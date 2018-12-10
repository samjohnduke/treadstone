import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Project } from "src/apps/projects/models/project";
import { FileList } from "src/collections/filesList";
import { TaskList } from "src/collections/taskList";
import { withProject } from "src/providers/project";
import styled from "src/styled";

const ProjectContainer = styled.div`
  & h3 {
    margin-top: 50px;
    font-size: 1.3em;
  }
`;

const NewButton = styled.button`
  background: #fff;
  border: 1px solid transparent;
  _box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  margin-bottom: 10px;
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
          <div>
            <h3>Tasks</h3>
            <NewButton>New</NewButton>
          </div>
          <div>
            {project.tasks ? (
              <TaskList tasks={project.tasks.slice(0, 4)} />
            ) : null}
          </div>
        </div>
        <div>
          <h3>Files</h3>
          <NewButton>Upload</NewButton>
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
