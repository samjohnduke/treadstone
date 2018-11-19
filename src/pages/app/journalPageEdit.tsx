import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal } from "src/models/journal";
import { withJournal } from "src/providers/journal";

import RichTextExample from "src/components/editor";

type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

class JournalPageEditComponent extends React.Component<Props> {
  public render() {
    return this.props.journal ? (
      <div>
        <h2>Editing: {this.props.journal ? this.props.journal.title : ""}</h2>
        <input
          name="tags"
          type="text"
          value={this.props.journal.tags.join(", ")}
        />
        <div style={{ minHeight: "400px", width: "100%" }}>
          <RichTextExample value={this.props.journal.content} />
        </div>
      </div>
    ) : null;
  }
}

export const JournalPageEdit = withJournal(JournalPageEditComponent);
