import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";

import { AppPage } from "src/design/appPage";
import { withListProvider } from "../provider";
import { ListsPage as Lists } from "./lists";

type Props = RouteComponentProps & {
  userId: string;
};

class ListsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <Router primary={false} style={{ flex: 1 }}>
          <Lists default={true} path="" lists={[]} />
        </Router>
      </AppPage>
    );
  }
}

export const ListsPage = withListProvider<Props>(ListsPageComponent);
