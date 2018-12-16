import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import RichTextView from "src/components/viewer";
import styled from "src/styled";
import { Container } from "../components/container";
import { withJournal } from "../withJournal";

import { ActionButton } from "src/design/actionButton";

// const TagList = styled("ul")`
//   margin: 0;
//   padding: 0;
//   display: flex;
//   margin-bottom: 20px;

//   li {
//     display: block;
//     padding: 5px 10px;
//     border-radius: 30px;
//     font-size: 0.9em;
//     background: rgba(0, 0, 0, 0.1);
//     color: #444;
//     margin-right: 10px;
//   }
// `;

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

const ButtonBar = styled.div`
  text-align: right;
  flex: 0 200px;
  display: flex;
  margin-top: 10px;

  & a {
    text-decoration: none;
  }

  @media (max-width: 800px) {
    flex: 1;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ButtonBarTop = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;

  & a {
    text-decoration: none;
    color: #333;
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
          <a href="#" onClick={() => window.history.go(-1)}>
            Back
          </a>
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
          <ButtonBar>
            <ActionButton as={Link} to="edit">
              Edit
            </ActionButton>
          </ButtonBar>
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
