import * as React from "react";
import { JournalContext } from "./context";
import { Journal } from "./models/journal";

export interface JournalProps {
  journal?: Journal;
}

export function withJournal<T>(journalId: string) {
  return function withJournalComponent(
    Component: React.ComponentType<T & JournalProps>
  ) {
    const WithUser = (props: T) => {
      return (
        <JournalContext.Consumer>
          {val => (
            <Component
              {...props}
              journal={val.find(j => j.key === journalId)}
            />
          )}
        </JournalContext.Consumer>
      );
    };

    return WithUser;
  };
}
