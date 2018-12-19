import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";

import { AppPage } from "src/design/appPage";

import { withJournalProvider } from "../provider";
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
        <Router primary={false} style={{ flex: 1 }}>
          <NewJournalPage path="new" />
          <JournalPage journalId="" path=":journalId" />
          <JournalPageEdit journalId="" path=":journalId/edit" />
          <JournalListPage path="" journals={[]} default={true} />
        </Router>
      </AppPage>
    );
  }
}

export const JournalsPage = withJournalProvider<Props>(JournalsPageComponent);
