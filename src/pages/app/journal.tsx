import { Link, Redirect, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";
import { Journal } from "src/models/journal";
import { withJournalCollection } from "src/providers/journal";
import styled from "src/styled";
import { JournalPage } from "./journalPage";
import { JournalPageEdit } from "./journalPageEdit";
import { NewJournalPage } from "./newJournal";

type Props = RouteComponentProps & {
  list: Journal[];
};

const NewBtn = styled(Link)`
  display: inline-block;
  color: #fff;
  border-radius: 25px;
  padding: 5px 25px;
  height: 25px;
  font-size: 0.9em;
  line-height: 25px;
  background: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

const List = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;

  & a {
    display: block;
    text-decoration: none;
    margin-top: 20px;
  }
`;

const Date = styled("div")`
  color: #777;
  font-size: 0.75em;
  text-decoration: none;
  margin-bottom: -3px;
`;

const Title = styled("div")`
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.3em;
  text-decoration: none;
  font-weight: 700;
  font-family: "PT Serif", serif;
`;

class JournalsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Journal</h2>
          <NewBtn to="new">new</NewBtn>
          <List>
            {this.props.list.map(j => (
              <li key={j.key}>
                <Link to={j.key}>
                  <Date>{j.createdAtDate()}</Date>
                  <Title>{j.title}</Title>
                </Link>
              </li>
            ))}
          </List>
        </aside>
        <div>
          <Router>
            <NewJournalPage path="new" />
            <JournalPage journalId="" path=":journalId" />
            <JournalPageEdit journalId="" path=":journalId/edit" />
            {this.props.list.length > 0 ? (
              // <JournalPage journalId={this.props.list[0].key} path="/" />
              <Redirect
                from="/"
                to={`/app/journal/${this.props.list[0].key}`}
                noThrow={true}
              />
            ) : null}
          </Router>
        </div>
      </AppPage>
    );
  }
}

export const JournalsPage = withJournalCollection(JournalsPageComponent);
