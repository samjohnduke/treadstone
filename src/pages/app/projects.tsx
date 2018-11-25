import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { ProjectsList } from "src/collections/projectsList";
import { AppPage } from "src/design/appPage";

import { NewProjectPage } from "./newProject";
import { ProjectPage } from "./projectPage";

export class ProjectsPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
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
