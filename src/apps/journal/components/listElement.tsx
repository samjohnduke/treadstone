import { navigate } from "@reach/router";
import * as React from "react";
import styled from "src/styled";
import book from "../images/book.png";
import { Journal } from "../models/journal";

const Item = styled.li`
  background: #fff;
  display: flex;
  padding: 15px;
  box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
  align-items: center;
  cursor: pointer;

  & input {
    flex: 0;
    margin: 10px 15px;
  }

  & img {
    display: block;
    /* width: 40px; */
    padding: 10px;
    height: 80px;
    width: 80px;
    background: #eee;
    margin: -15px 15px -15px -15px;
    filter: grayscale(0.9);
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
          <img src={book} />
          <div
            style={{
              WebkitLineClamp: 3,
              display: "flex",
              flex: "1 40px",
              fontSize: "1.1em",
              overflow: "hidden",
              width: "40flexboxpx"
            }}
          >
            {journal.title}
          </div>
          <div>{journal.createdAtDate()}</div>
        </Item>
      </>
    );
  }
}
