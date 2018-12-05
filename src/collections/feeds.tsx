import { navigate, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Feed } from "src/apps/reader/models/feed";
import { withFeedCollection } from "src/providers/feed";
import styled from "src/styled";

interface Props {
  list: Feed[];
}

const List = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`;

type PLProps = Props & RouteComponentProps;

class FeedListComponent extends React.Component<PLProps> {
  public render() {
    return (
      <List>
        {this.props.list.map(p => (
          <div key={p.name} onClick={() => navigate(`./feeds/${p.key}`)}>
            <h3>{p.name}</h3>
            <div>{p.itemCount}</div>
          </div>
        ))}
      </List>
    );
  }
}

export const FeedList = withFeedCollection<PLProps>(FeedListComponent);
