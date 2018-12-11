import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal, JournalDocument } from "src/apps/journal/models/journal";
import RichTextView from "src/components/viewer";
import { withJournal } from "src/providers/journal";
import styled from "src/styled";

const TagList = styled("ul")`
  margin: 0;
  padding: 0;
  display: flex;
  margin-bottom: 20px;

  li {
    display: block;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 0.9em;
    background: rgba(0, 0, 0, 0.1);
    color: #444;
    margin-right: 10px;
  }
`;

type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

const TitleBar = styled("div")`
  display: flex;
  align-items: center;

  & h2 {
    font-size: 1.8em;
    margin-right: 20px;
    color: #111;
  }

  & a {
    flex: 0;
  }
`;

const Btn = styled(Link)`
  display: inline-block;
  color: #fff;
  border-radius: 20px;
  padding: 5px 15px;
  height: 20px;
  font-size: 0.9em;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.6);
  text-decoration: none;
`;

class JournalPageComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    JournalDocument("BMRvH9myrxZdrRQd82HmlJIriJy1", props.journalId).subscribe(
      s => console.log(s)
    );
  }
  public render() {
    const { journal } = this.props;
    return journal ? (
      <div>
        <TitleBar>
          <h2>{journal.title}</h2>
          <Btn to="edit">edit</Btn>
        </TitleBar>

        <TagList>
          {journal.tags.map(t => (
            <li key={`tag-${t}`}>{t}</li>
          ))}
        </TagList>

        <div>
          <RichTextView
            key={journal.key}
            value={journal.content}
            readOnly={true}
          />
        </div>
      </div>
    ) : null;
  }
}

export const JournalPage = withJournal(JournalPageComponent);
