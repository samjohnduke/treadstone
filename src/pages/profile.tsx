import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

export class ProfilePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flex: 1, padding: 10 }}>
            <div style={{ flex: "1 1 800px", maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: "2em" }}>Sam Duke</h2>
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, padding: 10 }}>
            <div style={{ flex: "1 1 800px", maxWidth: 800, margin: "0 auto" }}>
              {" "}
            </div>
          </div>
        </div>
      </AppPage>
    );
  }
}
