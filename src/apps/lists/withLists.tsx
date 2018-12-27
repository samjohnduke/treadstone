import * as React from "react";
import { ListContext } from "./context";
import { IList, List } from "./models/list";

export interface ActionProps {
  create(o: string): Promise<string>;
  update(o: IList): any;
  delete(o: IList): any;
}

export interface ListProps {
  lists?: List[];
  actions?: ActionProps;
}

export function withLists<T extends React.ComponentClass>(Component: T): T {
  return (((props: any) => (
    <ListContext.Consumer>
      {val => (
        <Component
          {...props}
          lists={val.all}
          actions={{
            create: val.create,
            delete: val.delete,
            update: val.update
          }}
        />
      )}
    </ListContext.Consumer>
  )) as any) as T;
}
