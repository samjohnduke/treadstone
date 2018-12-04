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
  border-top: 1px solid #eee;
`;

const Container = styled("div")`
  flex: 1;

  & > ${List} {
    width: 800px;
    margin: 30px auto;
  }
`;

type PLProps = Props & RouteComponentProps;

class ProjectsListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <Container>
        <div style={{display: 'flex', borderBottom: '1px solid #dfdfdf', flex: 1, padding: 10}}>
          <div style={{flex: '1 1 800px', maxWidth: 800, margin: '0 auto'}}>
            <h2>Projects</h2>
          </div>
        </div>
        <List>
          {this.props.list.map(p => (
            <ProjectDetails
              key={p.name}
              onClick={() => navigate(`./projects/${p.key}`)}
            >
              <h3 style={{margin: '0', lineHeight: '1.4', flex: '0 150px'}}>{p.name}</h3>
              <div style={{lineHeight: '1.4',flex: '1'}}>{p.description}</div>
              <div style={{lineHeight: '1.4',flex: '0 150px'}}>{p.tags.join(", ")}</div>
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
