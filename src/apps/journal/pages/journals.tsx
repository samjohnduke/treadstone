import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Subscription } from "rxjs";
import { ActionButton } from "src/design/actionButton";
import styled from "src/styled";
import { JournalList } from "../collections/journalsList";
import { Journal, JournalCollection } from "../models/journal";

type Props = RouteComponentProps & {
  userId: string;
};

interface State {
  list: Journal[];
}

const List = styled("div")`
  margin-top: 10px;
`;

const Container = styled("div")`
  flex: 1;

  & > ${List} {
    max-width: 800px;
    margin: 30px auto;
  }
`;

export class JournalListPage extends React.Component<Props, State> {
  public state: State = {
    list: []
  };

  private subscription: Subscription;

  public componentDidMount = () => {
    this.subscription = JournalCollection(this.props.userId).subscribe(list =>
      this.setState({ list })
    );
  };

  public componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  public render() {
    return (
      <Container>
        <div style={{ display: "flex", flex: 1, padding: 10 }}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flex: "1 1 800px",
              justifyContent: "center",
              margin: "0 auto",
              maxWidth: 800
            }}
          >
            <h2 style={{ flex: 1 }}>Journals</h2>
            <div style={{ flex: "0 100px" }}>
              <ActionButton
                style={{ display: "block", textDecoration: "none" }}
                as={Link}
                to="./new"
              >
                <i
                  style={{ verticalAlign: "bottom" }}
                  className="material-icons"
                >
                  add
                </i>{" "}
                <span style={{ lineHeight: 1.5 }}>New</span>
              </ActionButton>
            </div>
          </div>
        </div>
        <List>
          <JournalList list={this.state.list} />
        </List>
      </Container>
    );
  }
}
