import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import styled from "src/styled";

import { List } from "../models/list";
import { withList } from "../withList";
import { ActionProps } from "../withLists";

type Props = RouteComponentProps & {
  listId: string;
  list?: List;
  actions?: ActionProps;
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

export class ListPageC extends React.Component<Props, ListsState> {
  public state: ListsState = {
    newOpen: false
  };
  public render() {
    console.log(this.props);
    return (
      <Container>
        <Main />
      </Container>
    );
  }
}

export const ListPage = withList<Props>(ListPageC);
