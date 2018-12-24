import { RouteComponentProps } from "@reach/router";
import * as React from "react";
// import { ActionButton } from "src/design/actionButton";
import styled from "src/styled";
import { NewList } from "../components/newList";
import { List } from "../models/list";
import { withLists } from "../withLists";

type Props = RouteComponentProps & {
  lists: List[];
};

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin: auto;
`;

const Aside = styled.div`
  flex: 0 200px;
  padding: 0 10px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const Main = styled.div`
  flex: 1;
  min-height: calc(100vh - 60px);
  background: #fff;
`;

interface ListsState {
  newOpen: boolean;
}

export class Lists extends React.Component<Props, ListsState> {
  public state: ListsState = {
    newOpen: false
  };
  public render() {
    return (
      <Container>
        <NewList
          showing={this.state.newOpen}
          close={() => this.setState({ newOpen: false })}
        />
        <Aside>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ flex: 1 }}>Lists</h2>
            <i
              onClick={() => this.setState({ newOpen: true })}
              className="material-icons"
            >
              add
            </i>
          </div>

          <ul>
            {this.props.lists.map(r => (
              <li key={r.key}>{r.name}</li>
            ))}
          </ul>
        </Aside>
        <Main />
      </Container>
    );
  }
}

export const ListsPage = withLists<Props>(Lists);
