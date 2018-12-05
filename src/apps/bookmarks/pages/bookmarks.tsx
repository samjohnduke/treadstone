import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

export class BookmarksPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Bookmarks</h2>
        </aside>
      </AppPage>
    );
  }
}
