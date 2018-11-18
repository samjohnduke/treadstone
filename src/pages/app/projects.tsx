import { Link, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { ProjectsList } from "src/collections/projectsList";
import { AppPage } from "src/design/appPage";
import { NewProjectPage } from "./newProject";
import { ProjectPage } from "./projectPage";

export class ProjectsPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Projects</h2>
          <ul>
            <li>
              <Link to="new">New</Link>
            </li>
            <li>Active</li>
            <li>Archived</li>
          </ul>
        </aside>
        <div>
          <Router>
            <ProjectsList list={[]} path="/" />
            <ProjectPage projectId="" project={undefined} path={":projectId"} />
            <NewProjectPage path="new" />
          </Router>
        </div>
      </AppPage>
    );
  }
}
