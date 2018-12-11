import * as React from "react";
import styled from "src/styled";

import { ListElement } from "../components/listElement";
import { Journal } from "../models/journal";

interface Props {
  list: Journal[];
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;

  & li {
    background: #fff;
    display: flex;
    box-shadow: 2px 2px 30px -4px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
  }

  & input {
    flex: 0;
    margin: 10px 15px;
  }

  & a {
    flex: 1;
    display: block;
    padding: 10px 15px;
  }
`;

export class JournalList extends React.Component<Props> {
  public render() {
    const { list } = this.props;
    return (
      <>
        <List>
          {list.map(val => (
            <ListElement key={val.key} journal={val} />
          ))}
        </List>
      </>
    );
  }
}
