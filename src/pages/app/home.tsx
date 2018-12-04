import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <div style={{display: 'flex', borderBottom: '1px solid #dfdfdf', flex: 1, padding: 10}}>
          <div style={{flex: '1 1 800px', maxWidth: 800, margin: '0 auto'}}>
            <h2>Home</h2>
          </div>
        </div>
      
      </AppPage>
    );
  }
}
