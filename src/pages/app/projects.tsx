import { Link, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";
import { NewProjectPage } from "./newProject";

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
            <NewProjectPage path="new" />
          </Router>
        </div>
      </AppPage>
    );
  }
}
