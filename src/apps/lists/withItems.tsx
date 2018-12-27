import * as React from "react";
import { ListItemContext } from "./context";

export function withItems<T extends React.ComponentClass>(Component: T): T {
  const WithItems = (props: any) => {
    return (
      <ListItemContext.Consumer>
        {val => {
          // console.log(val.all);
          return (
            <Component
              {...props}
              items={val.all}
              itemActions={{
                create: val.create,
                delete: val.delete,
                update: val.update
              }}
            />
          );
        }}
      </ListItemContext.Consumer>
    );
  };

  return (WithItems as any) as T;
}
