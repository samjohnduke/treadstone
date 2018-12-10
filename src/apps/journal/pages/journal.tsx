import { Link, Redirect, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import { ActionButton } from "src/design/actionButton";
import { AppPage } from "src/design/appPage";
import { withJournalCollection } from "src/providers/journal";
import styled from "src/styled";
import { JournalPage } from "./journalPage";
import { JournalPageEdit } from "./journalPageEdit";
import { NewJournalPage } from "./newJournal";

type Props = RouteComponentProps & {
  list: Journal[];
};

const List = styled("ul")`
  list-style: none;
  margin: 20px -20px;
  padding: 0;

  & li {
    border-top: 1px solid #eee;
    padding: 30px 20px;
  }

  & a {
    display: block;
    text-decoration: none;
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

const Aside = styled("aside")`
  padding: 10px 20px;
  flex: 0 280px !important;
  width: 280px;
  background: rgba(255, 255, 255, 0.9);
  border-right: 1px solid #eee;
  min-height: calc(100vh - 60px);
`;

class JournalsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <Aside>
          <h2>Journal</h2>
          <ActionButton as={Link} to="new">
            new
          </ActionButton>
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
        </Aside>
        <div>
          <Router>
            <NewJournalPage path="new" />
            <JournalPage journalId="" path=":journalId" />
            <JournalPageEdit journalId="" path=":journalId/edit" />
            {this.props.list.length > 0 ? (
              <Redirect
                from="/"
                to={`/app/journal/${
                  this.props.list[0].key // <JournalPage journalId={this.props.list[0].key} path="/" />
                }`}
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
