import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { EditJournalForm } from "src/apps/journal/forms/edit";
import { Journal } from "src/apps/journal/models/journal";
import { Container } from "../components/container";
import { withJournal } from "../withJournal";

type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

class JournalPageEditComponent extends React.Component<Props> {
  public render() {
    const { journal } = this.props;
    return journal ? (
      <Container>
        <h2>Edit</h2>
        <EditJournalForm journal={journal} />
      </Container>
    ) : null;
  }
}

export const JournalPageEdit = withJournal(JournalPageEditComponent);
