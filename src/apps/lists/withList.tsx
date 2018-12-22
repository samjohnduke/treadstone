import * as React from "react";
import { ListContext } from "./context";
import { List } from "./models/list";

export interface JournalProps {
  listId: string;
  list?: List;
}

export function withList<T>(Component: React.ComponentType<T & JournalProps>) {
  const WithList = (props: T & JournalProps) => {
    return (
      <ListContext.Consumer>
        {val => (
          <Component {...props} list={val.find(j => j.key === props.listId)} />
        )}
      </ListContext.Consumer>
    );
  };

  return WithList;
}
