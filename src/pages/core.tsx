import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppBar } from "src/components/appbar";
import { Sidebar } from "src/components/sidebar";
import * as routes from "src/constants/routes";
import { Page } from "src/design/page";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";
import { FeedProvider } from "src/providers/feed";
import { JournalProvider } from "src/providers/journal";
import { ProjectProvider } from "src/providers/project";

import "src/firebase/firestore";
import { AgendaPage } from "./app/agenda";
import { BookmarksPage } from "./app/bookmarks";
import { ContacsPage } from "./app/contacts";
import { HomePage } from "./app/home";
import { JournalsPage } from "./app/journal";
import { ProjectsPage } from "./app/projects";
import { ReaderPage } from "./app/reader";
import { StocksPage } from "./app/stocks";

import { MainPage } from "src/design/mainPage";

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
                  <Sidebar />
                  <Router>
                    <HomePage path="/" />
                    <ProjectsPage path={`${routes.PROJECTS}/*`} />
                    <AgendaPage path={`${routes.AGENDA}/*`} />
                    <JournalsPage list={[]} path={`${routes.JOURNAL}/*`} />
                    <StocksPage path={routes.STOCKS} />
                    <BookmarksPage path={routes.BOOKMARKS} />
                    <ContacsPage path={routes.CONTACTS} />
                    <ReaderPage path={`${routes.FEEDS}/*`} />
                  </Router>
                </MainPage>
              </div>
            </JournalProvider>
          </FeedProvider>
        </ProjectProvider>
      </Page>
    );
  }
}

export const CorePage = withAuthorization<Props>(
  user => (user ? true : false),
  routes.AUTHENTICATE
)(Core);
