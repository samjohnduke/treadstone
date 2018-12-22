import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppBar } from "src/components/appbar";

import * as routes from "src/constants/routes";
import { Page } from "src/design/page";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";

import "src/firebase/firestore";

// import { BookmarksPage } from "../apps/bookmarks/pages/bookmarks";
// import { ContacsPage } from "../apps/contacts/pages/contacts";
// import { AgendaPage } from "../apps/diary/pages/agenda";
import { HomePage } from "./app";

// import { ReaderPage } from "../apps/reader/pages/reader";
// import { StocksPage } from "../apps/stocks/pages/stocks";

import { MainPage } from "src/design/mainPage";
import { ProfilePage } from "./profile";

import { UserProvider } from "src/providers/user";

// const ProjectsPage = React.lazy(() => import("src/apps/projects"));
const JournalsPage = React.lazy(() => import("src/apps/journal"));

type Props = UserProps & RouteComponentProps;

export class Core extends React.Component<Props> {
  public render() {
    if (!this.props.user) {
      return null;
    }

    return (
      <Page>
        <div style={{ width: "100%" }}>
          <UserProvider userId={this.props.user.uid}>
            <AppBar user={undefined} />
            <MainPage>
              <React.Suspense fallback={<div />}>
                <Router style={{ flex: 1 }}>
                  <HomePage path="/" />
                  {/* <ProjectsPage path={`${routes.PROJECTS}/*`} />
                  <AgendaPage path={`${routes.AGENDA}/*`} /> */}
                  <JournalsPage
                    userId={this.props.user.uid}
                    list={[]}
                    path={`${routes.JOURNAL}/*`}
                  />
                  {/* <StocksPage path={`${routes.STOCKS}/*`} />
                  <BookmarksPage path={`${routes.BOOKMARKS}/*`} />
                  <ContacsPage path={`${routes.CONTACTS}/*`} />
                  <ReaderPage path={`${routes.FEEDS}/*`} /> */}
                  <ProfilePage path={`${routes.PROFILE}/*`} />
                </Router>
              </React.Suspense>
            </MainPage>
          </UserProvider>
        </div>
      </Page>
    );
  }
}

export default withAuthorization<Props>(
  user => (user ? true : false),
  routes.AUTHENTICATE
)(Core);
