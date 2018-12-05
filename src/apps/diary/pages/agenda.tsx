import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";
import { TaskProvider } from "src/providers/tasks";
import { TasksList } from "./agendaList";

export class AgendaPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage style={{ display: "block" }}>
        <TaskProvider>
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
