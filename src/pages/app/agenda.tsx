import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";
import { TaskProvider } from 'src/providers/tasks';  
import { TasksList } from './agendaList';

export class AgendaPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <TaskProvider>
            <h2>Agenda</h2>
          <div>
            <Router>
              <TasksList list={[]} path="/" />
            </Router>
          </div>
        </TaskProvider>
      </AppPage>
    );
  }
}
