import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";

import { AppPage } from "src/design/appPage";

import { JournalPageEdit } from "./journalEdit";
import { JournalPage } from "./journalPage";
import { JournalListPage } from "./journals";
import { NewJournalPage } from "./newJournal";

type Props = RouteComponentProps & {
  userId: string;
  list: Journal[];
};

class JournalsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <Router style={{ flex: 1 }}>
          <NewJournalPage path="new" />
          <JournalPage
            userId={this.props.userId}
            journalId=""
            path=":journalId"
          />
          <JournalPageEdit
            // userId={this.props.userId}
            journalId=""
            path=":journalId/edit"
          />
          <JournalListPage userId={this.props.userId} path="" default={true} />
        </Router>
      </AppPage>
    );
  }
}

export const JournalsPage = JournalsPageComponent;
