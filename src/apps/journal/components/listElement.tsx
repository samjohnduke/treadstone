import { navigate } from "@reach/router";
import * as React from "react";
import styled from "src/styled";
import { Journal } from "../models/journal";

const Item = styled.li`
  background: #fff;
  display: flex;
  padding: 10px;
  box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
  align-items: center;
  cursor: pointer;

  & input {
    flex: 0;
    margin: 10px 15px;
  }
`;

interface ListElementProps {
  journal: Journal;
}

export class ListElement extends React.Component<ListElementProps> {
  public render() {
    const { journal } = this.props;
    return (
      <>
        <Item
          onClick={() => navigate(`journal/${journal.key}`)}
          tabIndex={0}
          onKeyDown={e =>
            e.key === "Enter" ? navigate(`journal/${journal.key}`) : null
          }
        >
          <div>{journal.title}</div>
          <div>{journal.createdAtDate()}</div>
        </Item>
      </>
    );
  }
}
