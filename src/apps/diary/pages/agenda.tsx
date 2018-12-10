import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import * as routes from "src/constants/routes";
import { AppPage } from "src/design/appPage";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";
import { TaskProvider } from "src/shared/tasks/providers/tasks";
import { TasksList } from "./agendaList";

type Props = UserProps & RouteComponentProps;

export class AgendaPageC extends React.Component<Props> {
  public render() {
    return (
      <AppPage style={{ display: "block" }}>
        <TaskProvider userId={this.props.user!.uid}>
          <div
            style={{ display: "flex", flex: 1, padding: "10px 10px 0 10px" }}
          >
            <div style={{ flex: "1 1 800px", maxWidth: 800, margin: "0 auto" }}>
              <h2>Agenda</h2>
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, padding: 10 }}>
            <div style={{ flex: "1 1 800px", maxWidth: 800, margin: "0 auto" }}>
              <Router>
                <TasksList list={[]} path="/" />
              </Router>
            </div>
          </div>
        </TaskProvider>
      </AppPage>
    );
  }
}

export const AgendaPage = withAuthorization<Props>(
  user => (user ? true : false),
  routes.AUTHENTICATE
)(AgendaPageC);
