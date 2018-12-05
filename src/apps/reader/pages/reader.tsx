import { Link, RouteComponentProps, Router } from "@reach/router";
import * as React from "react";
import { FeedList } from "src/collections/feeds";
import { AppPage } from "src/design/appPage";
import styled from "src/styled";
import { FeedPage } from "./feedPage";
import { NewFeedPage } from "./newFeed";

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

export class ReaderPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <AppPage>
        <aside>
          <h2>Reader</h2>
          <NewBtn to="new">New</NewBtn>
          <FeedList list={[]} />
        </aside>
        <div>
          <Router>
            <NewFeedPage path="new" />
            <FeedPage feedId="" path=":feedId" />
          </Router>
        </div>
      </AppPage>
    );
  }
}
