import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

export class ContacsPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Contacts</h2>
        </aside>
      </AppPage>
    );
  }
}
