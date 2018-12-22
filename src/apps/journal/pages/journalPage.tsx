import { Link, navigate, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import RichTextView from "src/components/viewer";
import styled from "src/styled";
import { ActionBar, Left, Right } from "../components/actionBar";
import { Container } from "../components/container";
import { withJournal } from "../withJournal";

const Meta = styled("div")`
  display: flex;
  color: #888;
  padding: 5px 0 25px;

  & > div {
    padding: 0 10px 0 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

type Props = RouteComponentProps & {
  journalId: string;
  journal?: Journal;
};

const TitleBar = styled("div")`
  display: flex;
  align-items: flex-start;
  width: 100%;

  & h1 {
    font-size: 2.3em;
    margin-right: 20px;
    color: #111;
    margin-bottom: 5px;
    margin-top: 5px;

    @media (max-width: 800px) {
      font-size: 1.7em;
    }
  }

  & a {
    flex: 0;
  }
`;

const TopContainer = styled("div")`
  display: block;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
`;

class JournalPageComponent extends React.Component<Props> {
  public render() {
    const { journal } = this.props;
    return journal ? (
      <Container>
        <ActionBar>
          <Left>
            <a href="#" onClick={() => window.history.go(-1)}>
              <i className="material-icons">keyboard_backspace</i>
              <span>Back</span>
            </a>
          </Left>

          <Right className="right">
            <Link to="edit">
              <i className="material-icons">edit</i>
              <span>Edit</span>
            </Link>

            <a
              href=""
              onClick={e => {
                e.preventDefault();
                journal.ref.delete().then(() => navigate("/app/journal"));
              }}
            >
              <i className="material-icons">delete</i>
              <span>Trash</span>
            </a>
          </Right>
        </ActionBar>

        <TopContainer>
          <TitleBar>
            <h1>{journal.title}</h1>
          </TitleBar>

          <Meta>
            <div>
              <strong>Created at: </strong>
              <span>{journal.createdAtDate()}</span>
            </div>
            <div>
              <strong>Tags: </strong>
              <span>{journal.tags.join(", ")}</span>
            </div>
          </Meta>
        </TopContainer>

        <RichTextView
          key={journal.key}
          value={journal.content}
          readOnly={true}
        />
      </Container>
    ) : null;
  }
}

export const JournalPage = withJournal<Props>(JournalPageComponent);
