import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Subscription } from "rxjs";
import { EditJournalForm } from "src/apps/journal/forms/edit";
import { Journal, JournalDocument } from "src/apps/journal/models/journal";
import { Container } from "src/design/authContainer";

type Props = RouteComponentProps & {
  journalId: string;
  userId: string;
};

interface State {
  journal?: Journal;
}

class JournalPageEditComponent extends React.Component<Props, State> {
  public state: State = { journal: undefined };
  private subscription: Subscription;

  public componentDidMount = () => {
    this.subscription = JournalDocument(
      this.props.userId,
      this.props.journalId
    ).subscribe(journal => this.setState({ journal }));
  };

  public componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  public render() {
    const { journal } = this.state;
    return journal ? (
      <Container>
        <h2>Edit</h2>
        <EditJournalForm journal={journal} />
      </Container>
    ) : null;
  }
}

export const JournalPageEdit = JournalPageEditComponent;
