import * as React from "react";
import { JournalContext } from "./context";
import { Journal } from "./models/journal";

export interface JournalProps {
  journalId: string;
  journal?: Journal;
}

export function withJournal<T>(
  Component: React.ComponentType<T & JournalProps>
) {
  const WithUser = (props: T & JournalProps) => {
    return (
      <JournalContext.Consumer>
        {val => (
          <Component
            {...props}
            journal={val.find(j => j.key === props.journalId)}
          />
        )}
      </JournalContext.Consumer>
    );
  };

  return WithUser;
}
