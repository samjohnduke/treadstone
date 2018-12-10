import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import { withJournal } from "src/providers/journal";

import { EditJournalForm } from "src/forms/editJournal";

type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

class JournalPageEditComponent extends React.Component<Props> {
  public render() {
    console.log(this.props.journal);
    return this.props.journal ? (
      <div>
        <h2>Edit</h2>
        <EditJournalForm journal={this.props.journal} />
      </div>
    ) : null;
  }
}

export const JournalPageEdit = withJournal(JournalPageEditComponent);
