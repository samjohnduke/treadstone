import * as React from "react";
import { ListItem } from "./models/item";
import { IList, List } from "./models/list";

export interface ListContextState {
  all: List[];
  create(o: string): Promise<string>;
  update(o: IList): any;
  delete(o: IList): any;
}

const def: ListContextState = {
  all: [] as List[],
  create: () => console.log as any,
  delete: () => console.log,
  update: () => console.log
};

export const ListContext = React.createContext(def);

export interface ListItemContextState {
  all: ListItem[];
  create(o: string, order: number): Promise<string>;
  update(o: IList): any;
  delete(o: IList): any;
}

const defItem: ListItemContextState = {
  all: [] as ListItem[],
  create: () => console.log as any,
  delete: () => console.log,
  update: () => console.log
};

export const ListItemContext = React.createContext(defItem);
