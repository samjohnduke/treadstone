import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

export class StocksPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Stocks</h2>
        </aside>
      </AppPage>
    );
  }
}
