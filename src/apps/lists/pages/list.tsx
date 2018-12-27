import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import styled from "src/styled";

import { withItemProvider } from "../itemProvider";
import { ListItem } from "../models/item";
import { List } from "../models/list";
import { withItems } from "../withItems";
import { withList } from "../withList";
import { ActionProps } from "../withLists";

type Props = RouteComponentProps & {
  listId: string;
  list?: List;
  items?: ListItem[];
  actions?: ActionProps;
  itemActions?: ActionProps;
  userId: string;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin: auto;
`;

const Main = styled.div`
  flex: 1;
  min-height: calc(100vh - 60px);
  background: #fff;
`;

interface ListsState {
  newOpen: boolean;
}

@withList
@withItemProvider
@withItems
export class ListPage extends React.Component<Props, ListsState> {
  public state: ListsState = {
    newOpen: false
  };
  public render() {
    const items = this.props.items || [];
    console.log(items.map(t => t.toJS()));
    return (
      <Container>
        <Main>
          <h2>{this.props.list ? this.props.list.name : null}</h2>
          <ul>
            {items.map(i => (
              <li key={i.key}>{i.content}</li>
            ))}
          </ul>
        </Main>
      </Container>
    );
  }
}
