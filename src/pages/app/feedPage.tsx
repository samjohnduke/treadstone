import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Feed } from "src/models/feed";
import { withFeed } from "src/providers/feed";

type Props = RouteComponentProps & {
  feedId: string;
  feed?: Feed;
};

class FeedPageComponent extends React.Component<Props> {
  public render() {
    const { feed } = this.props;
    return feed ? (
      <div>
        <h2>{feed.name}</h2>
      </div>
    ) : null;
  }
}

export const FeedPage = withFeed<Props>(FeedPageComponent);
