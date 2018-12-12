import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { NewJournalForm } from "src/apps/journal/forms/new";
import { Container } from "../components/container";

export class NewJournalPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Container>
        <h2>New Journal Entry</h2>
        <NewJournalForm />
      </Container>
    );
  }
}
