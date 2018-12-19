import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { ActionButton } from "src/design/actionButton";
import styled from "src/styled";
import { JournalList } from "../collections/journalsList";
import { Journal } from "../models/journal";
import { withJournals } from "../withJournals";

type Props = RouteComponentProps & {
  journals: Journal[];
};

const List = styled("div")`
  margin-top: 10px;

  @media (max-width: 800px) {
    flex: 1;
    padding: 0 10px;
  }
`;

const Container = styled("div")`
  flex: 1;

  & > ${List} {
    max-width: 800px;
    margin: 30px auto;

    @media (max-width: 800px) {
      margin: 10px auto;
    }
  }
`;

export class JournalListPageComponent extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <div style={{ display: "flex", flex: 1, padding: "10px 10px" }}>
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
            <h2 style={{ flex: 1, fontSize: "2em" }}>My Journal</h2>
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
          <JournalList list={this.props.journals} />
        </List>
      </Container>
    );
  }
}

export const JournalListPage = withJournals<Props>(JournalListPageComponent);
