import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Subscription } from "rxjs";
import { Journal, JournalDocument } from "src/apps/journal/models/journal";
import RichTextView from "src/components/viewer";
import styled from "src/styled";
import { Container } from "../components/container";

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
  userId: string;
  journalId: string;
};

interface State {
  journal?: Journal;
}

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

class JournalPageComponent extends React.Component<Props, State> {
  public state: State = {};

  private subscription: Subscription;

  public componentDidMount = () => {
    this.subscription = JournalDocument(
      this.props.userId,
      this.props.journalId
    ).subscribe(journal => this.setState({ journal }));
  };

  public componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  public render() {
    const { journal } = this.state;
    return journal ? (
      <Container>
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
      </Container>
    ) : null;
  }
}

export const JournalPage = JournalPageComponent;
