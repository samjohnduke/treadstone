import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { NewFeedForm } from "src/forms/newFeed";

export class NewFeedPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>New Feed</h2>
        <NewFeedForm />
      </div>
    );
  }
}
