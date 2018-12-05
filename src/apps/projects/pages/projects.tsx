import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";

import { AppPage } from "src/design/appPage";

import { ProjectsList } from './list';
import { NewProjectPage } from "./new";
import { ProjectPage } from "./project";

export class ProjectsPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <>
          <Router style={{ flex: 1 }}>
            <ProjectsList list={[]} path="/" />
            <ProjectPage projectId="" project={undefined} path={":projectId"} />
            <NewProjectPage path="new" />
          </Router>
        </>
      </AppPage>
    );
  }
}
