import { Link, navigate, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Project } from "src/models/project";
import { withProjectCollection } from "src/providers/project";
import styled from "src/styled";

interface Props {
  list: Project[];
}

const List = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`;

const ProjectDetails = styled("div")`
  padding: 20px;
  background: #fff;
  box-shadow: 4px 4px 20px -4px rgba(100, 100, 100, 0.15);
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.96);
  }
`;

const NewBtn = styled(Link)`
  display: inline-block;
  color: #fff;
  border-radius: 25px;
  padding: 5px 25px;
  height: 25px;
  font-size: 0.9em;
  line-height: 25px;
  background: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

const PList = styled("ul")`
  padding: 0;
  margin: 10px 0 0 0;
  list-style: none;

  & li {
    padding: 2px 0;
  }
`;

const Pa = styled("div")`
  display: flex;

  & aside {
    flex: 0 0 200px;
  }
`;

type PLProps = Props & RouteComponentProps;

class ProjectsListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <Pa>
        <aside>
          <h2>Projects</h2>
          <NewBtn to="new">New</NewBtn>
          <PList />
        </aside>
        <List>
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
      </Pa>
    );
  }
}

export const ProjectsList = withProjectCollection<PLProps>(
  ProjectsListComponent
);
