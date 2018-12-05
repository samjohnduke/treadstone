import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { NewJournalForm } from "src/forms/newJournal";

export class NewJournalPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>New Journal Entry</h2>
        <NewJournalForm />
      </div>
    );
  }
}
