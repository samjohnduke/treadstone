import * as React from "react";
import { JournalContext } from "./context";
import { Journal } from "./models/journal";

export interface JournalProps {
  journals?: Journal[];
}

export function withJournals<T>(
  Component: React.ComponentType<T & JournalProps>
) {
  const WithJournal = (props: T) => {
    return (
      <JournalContext.Consumer>
        {val => <Component {...props} journals={val} />}
      </JournalContext.Consumer>
    );
  };

  return WithJournal;
}
