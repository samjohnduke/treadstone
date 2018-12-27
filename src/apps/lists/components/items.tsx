import * as React from "react";
import { ListItem } from "../models/item";
import { withItems } from "../withItems";

interface Props {
  items: ListItem[];
}

@withItems
export class ListItems extends React.Component<Props> {
  public render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map(i => (
          <li key={i.key}>{i.content}</li>
        ))}
      </ul>
    );
  }
}
