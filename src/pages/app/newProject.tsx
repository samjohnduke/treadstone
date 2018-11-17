import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { NewProjectForm } from "src/forms/newProject";

export class NewProjectPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>New Project</h2>
        <NewProjectForm />
      </div>
    );
  }
}
