import * as React from "react";
import { ListContext } from "./context";
import { List } from "./models/list";

export interface JournalProps {
  lists?: List[];
}

export function withLists<T>(Component: React.ComponentType<T & JournalProps>) {
  const WithLists = (props: T) => {
    return (
      <ListContext.Consumer>
        {val => <Component {...props} lists={val} />}
      </ListContext.Consumer>
    );
  };

  return WithLists;
}
