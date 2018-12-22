import { RouteComponentProps } from "@reach/router";
import * as React from "react";
// import { ActionButton } from "src/design/actionButton";
import styled from "src/styled";
import { List } from "../models/list";
import { withLists } from "../withLists";

type Props = RouteComponentProps & {
  lists: List[];
};

const Container = styled.div``;

export class Lists extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <h2>Lists</h2>
      </Container>
    );
  }
}

export const ListsPage = withLists<Props>(Lists);
