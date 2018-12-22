import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { NewJournalForm } from "src/apps/journal/forms/new";
import { ActionBar, Left } from "../components/actionBar";
import { Container } from "../components/container";

export class NewJournalPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Container>
        <ActionBar>
          <Left>
            <a href="#" onClick={() => window.history.go(-1)}>
              <i className="material-icons">keyboard_backspace</i>
              <span>Back</span>
            </a>
            <h3 style={{ margin: 0, paddingLeft: 10 }}>New</h3>
          </Left>
        </ActionBar>
        <NewJournalForm />
      </Container>
    );
  }
}
