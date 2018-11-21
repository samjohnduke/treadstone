import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import RichTextView from 'src/components/viewer';
import { Journal } from "src/models/journal";
import { withJournal } from "src/providers/journal";




type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

class JournalPageComponent extends React.Component<Props> {
  public render() {
    const { journal } = this.props;
    return journal ? (
      <div>
        <h2>{journal.title}</h2>
        <Link to="edit">edit</Link>

        <ul>
          {journal.tags.map(t => (
            <li key={`tag-${t}`}>{t}</li>
          ))}
        </ul>

        <div>
          <RichTextView value={journal.content} readOnly={true} />
        </div>
      </div>
    ) : null;
  }
}

export const JournalPage = withJournal(JournalPageComponent);
