import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import RichTextView from "src/components/viewer";
import styled from "src/styled";
import { Container } from "../components/container";
import { withJournal } from "../withJournal";

const Meta = styled("div")`
  display: flex;
  color: #888;
  padding: 5px 0 25px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const TagList = styled("div")``;

const Created = styled("div")`
  padding: 0 10px 0 0;
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
  }

  & a {
    flex: 0;
  }
`;

const ButtonBarTop = styled.div`
  display: flex;
  justify-content: flex-start;
  background: transparent;
  padding: 10px 20px;
  margin: 0 -20px 20px;

  & a {
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    background: #eee;
    border: 1px solid #aaa;
    padding: 4px;
    line-height: 20px;
    margin-right: 10px;
    width: 50px;
    text-align: center;

    & .material-icons {
      font-size: 18px;
      line-height: 20px;
      vertical-align: top;
    }

    & span {
      display: none;
      vertical-align: top;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  & .left {
    flex: 1;
    display: flex;
  }

  & .right {
    display: flex;
  }

  @media (max-width: 800px) {
    background: #fff;
  }
`;

const TopContainer = styled("div")`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

class JournalPageComponent extends React.Component<Props> {
  public render() {
    const { journal } = this.props;
    return journal ? (
      <Container>
        <ButtonBarTop>
          <div className="left">
            <a href="#" onClick={() => window.history.go(-1)}>
              <i className="material-icons">keyboard_backspace</i>
              <span>Back</span>
            </a>
          </div>

          <div className="right">
            <Link to="edit">
              <i className="material-icons">edit</i>
              <span>Edit</span>
            </Link>

            <Link to="">
              <i className="material-icons">delete</i>
              <span>Trash</span>
            </Link>
          </div>
        </ButtonBarTop>

        <TopContainer>
          <div style={{ flex: 1, width: "100%" }}>
            <TitleBar>
              <h1>{journal.title}</h1>
            </TitleBar>

            <Meta>
              <Created>
                <strong>Created at: </strong>
                <span>{journal.createdAtDate()}</span>
              </Created>
              <TagList>
                <strong>Tags: </strong>
                <span>{journal.tags.join(", ")}</span>
              </TagList>
            </Meta>
          </div>
        </TopContainer>

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

export const JournalPage = withJournal<Props>(JournalPageComponent);
