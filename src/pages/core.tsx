import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppBar } from "src/components/appbar";

import * as routes from "src/constants/routes";
import { Page } from "src/design/page";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";
import { FeedProvider } from "src/providers/feed";
import { JournalProvider } from "src/providers/journal";
import { ProjectProvider } from "src/providers/project";

import "src/firebase/firestore";

import { BookmarksPage } from "../apps/bookmarks/pages/bookmarks";
import { ContacsPage } from "../apps/contacts/pages/contacts";
import { AgendaPage } from "../apps/diary/pages/agenda";
import { HomePage } from "./app";

import { JournalsPage } from "../apps/journal/pages/journal";

import { ReaderPage } from "../apps/reader/pages/reader";
import { StocksPage } from "../apps/stocks/pages/stocks";

import { MainPage } from "src/design/mainPage";

const ProjectsPage = React.lazy(() => import("src/apps/projects"));

type Props = UserProps & RouteComponentProps;

export class Core extends React.Component {
  public render() {
    return (
      <Page>
        <ProjectProvider>
          <FeedProvider>
            <JournalProvider>
              <div style={{ width: "100%" }}>
                <AppBar />
                <MainPage>
                  <React.Suspense fallback={<div />}>
                    <Router style={{ flex: 1 }}>
                      <HomePage path="/" />
                      <ProjectsPage path={`${routes.PROJECTS}/*`} />
                      <AgendaPage path={`${routes.AGENDA}/*`} />
                      <JournalsPage list={[]} path={`${routes.JOURNAL}/*`} />
                      <StocksPage path={`${routes.STOCKS}/*`} />
                      <BookmarksPage path={`${routes.BOOKMARKS}/*`} />
                      <ContacsPage path={`${routes.CONTACTS}/*`} />
                      <ReaderPage path={`${routes.FEEDS}/*`} />
                    </Router>
                  </React.Suspense>
                </MainPage>
              </div>
            </JournalProvider>
          </FeedProvider>
        </ProjectProvider>
      </Page>
    );
  }
}

export default withAuthorization<Props>(
  user => (user ? true : false),
  routes.AUTHENTICATE
)(Core);
