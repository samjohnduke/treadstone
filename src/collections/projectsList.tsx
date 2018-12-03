import { navigate, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Project } from "src/models/project";
import { withProjectCollection } from "src/providers/project";
import styled from "src/styled";

interface Props {
  list: Project[];
}

const List = styled("div")`
  margin-top: 10px;
`;

const ProjectDetails = styled("div")`
  display: flex;
  padding: 20px;
  background: #fff;
  box-shadow: 4px 4px 20px -4px rgba(100, 100, 100, 0.15);
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.96);
  }
`;

const Container = styled("div")`
  flex: 1;

  & > div {
    width: 800px;
    margin: 0 auto;
  }
`;

type PLProps = Props & RouteComponentProps;

class ProjectsListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <Container>
        <div>
          <h2>Projects</h2>
        </div>
        <List>
          <div>
            <div>Name</div>
            <div>Description</div>
            <div>Tags</div>
          </div>
          {this.props.list.map(p => (
            <ProjectDetails
              key={p.name}
              onClick={() => navigate(`./projects/${p.key}`)}
            >
              <h3>{p.name}</h3>
              <div>{p.description}</div>
              <div>{p.tags.join(", ")}</div>
            </ProjectDetails>
          ))}
        </List>
      </Container>
    );
  }
}

export const ProjectsList = withProjectCollection<PLProps>(
  ProjectsListComponent
);
