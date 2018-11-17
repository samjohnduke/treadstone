import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Navbar } from "src/components/navbar";
import { Jumbo } from "src/design/jumbo";
import { PageSection } from "src/design/pageSection";

export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <PageSection>
        <Navbar />
        <Jumbo>
          <h2>Manage your work life balance differently</h2>
          <p>
            Personal software to manage project, tasks, documentation and more
          </p>
        </Jumbo>
      </PageSection>
    );
  }
}
