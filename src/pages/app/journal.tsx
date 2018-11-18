import { Link, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";
import { Journal } from "src/models/journal";
import { withJournalCollection } from "src/providers/journal";
import { NewJournalPage } from "./newJournal";

type Props = RouteComponentProps & {
  list: Journal[];
};

class JournalsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Journal</h2>
          <Link to="new">new</Link>
          <ul>
            {this.props.list.map(j => (
              <li key={j.key}>{j.title}</li>
            ))}
          </ul>
        </aside>
        <div>
          <Router>
            <NewJournalPage path="new" />
          </Router>
        </div>
      </AppPage>
    );
  }
}

export const JournalsPage = withJournalCollection(JournalsPageComponent);
