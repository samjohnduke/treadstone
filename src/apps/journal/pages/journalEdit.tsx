import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { EditJournalForm } from "src/apps/journal/forms/edit";
import { Journal } from "src/apps/journal/models/journal";
import { ActionBar } from "../components/actionBar";
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
        <ActionBar>
          <div className="left">
            <a href="#" onClick={() => window.history.go(-1)}>
              <i className="material-icons">keyboard_backspace</i>
              <span>Back</span>
            </a>
          </div>
        </ActionBar>

        <EditJournalForm journal={journal} />
      </Container>
    ) : null;
  }
}

export const JournalPageEdit = withJournal(JournalPageEditComponent);
