import { RouteComponentProps, Router } from "@reach/router";
import * as React from "react";

import { AppPage } from "src/design/appPage";
import styled from "src/styled";
import { Sidebar } from "../components/sidebar";
import { withListProvider } from "../provider";
import { ListPage } from "./list";

type Props = RouteComponentProps & {
  userId: string;
};

const Aside = styled.div`
  flex: 0 200px;
  padding: 0 10px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  & i {
    cursor: pointer;
  }
`;

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

class ListsPageComponent extends React.Component<Props> {
  public render() {
    return (
      <AppPage>
        <Container>
          <Aside>
            <Sidebar create={() => console.log("test") as any} />
          </Aside>
          <Main>
            <Router primary={false} style={{ flex: 1 }}>
              <ListPage path=":listId" listId="" />
            </Router>
          </Main>
        </Container>
      </AppPage>
    );
  }
}

export const ListsPage = withListProvider<Props>(ListsPageComponent);
