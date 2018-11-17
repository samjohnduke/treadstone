import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppBar } from "src/components/appbar";
import { AGENDA, AUTHENTICATE, JOURNAL, PROJECTS } from "src/constants/routes";
import { Page } from "src/design/page";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";

import "src/firebase/firestore";
import { AgendaPage } from "./app/agenda";
import { HomePage } from "./app/home";
import { JournalPage } from "./app/journal";
import { ProjectsPage } from "./app/projects";

type Props = UserProps & RouteComponentProps;

export class Core extends React.Component {
  public cl(e: React.SyntheticEvent<HTMLElement>) {
    console.log(e);
  }

  public render() {
    return (
      <Page>
        <div style={{ width: "100%" }}>
          <AppBar />
          <Router>
            <HomePage path="/" />
            <ProjectsPage path={`${PROJECTS}/*`} />
            <AgendaPage path={AGENDA} />
            <JournalPage path={JOURNAL} />
          </Router>
        </div>
      </Page>
    );
  }
}

export const CorePage = withAuthorization<Props>(
  user => (user ? true : false),
  AUTHENTICATE
)(Core);
