import * as React from "react";
import { Journal } from "./models/journal";

const def: Journal[] = [];

export const JournalContext = React.createContext(def);
