import * as React from "react";
import { ListContext } from "./context";
import { List } from "./models/list";
import { ActionProps } from "./withLists";

export interface JournalProps {
  listId: string;
  list?: List;
  actions?: ActionProps;
}

export function withList<T>(Component: React.ComponentType<T & JournalProps>) {
  const WithList = (props: T & JournalProps) => {
    return (
      <ListContext.Consumer>
        {val => (
          <Component
            {...props}
            list={val.all.find(j => j.key === props.listId)}
            actions={{
              create: val.create,
              delete: val.delete,
              update: val.update
            }}
          />
        )}
      </ListContext.Consumer>
    );
  };

  return WithList;
}
