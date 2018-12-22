import * as React from "react";
import { List } from "./models/list";

const def: List[] = [];

export const ListContext = React.createContext(def);
