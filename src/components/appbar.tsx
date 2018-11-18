import { Link } from "@reach/router";
import * as React from "react";
import {
  AGENDA,
  APP,
  BOOKMARKS,
  CONTACTS,
  JOURNAL,
  PROJECTS,
  STOCKS
} from "src/constants/routes";
import { doSignOut } from "src/firebase/auth";
import styled from "src/styled";

const Bar = styled("div")`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.2);

  & .inner {
    width: 1000px;
    height: 60px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & h1 {
    margin: 0;
    font-size: 1.5em;
    text-align: left;

    & a {
      text-decoration: none;
    }
  }

  & input {
    height: 35px;
    padding: 0 10px;
    border-radius: 2px;
    border: 1px solid #aaa;
  }

  & button {
    height: 35px;
    margin: 0 0 0 20px;
    padding: 10px 20px;
    color: #fff;
    background: rgba(40, 50, 60, 1);
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`;

const Left = styled("div")`
  flex: 0;
  padding: 0 20px 0 0;
  align-items: flex-start;
  justify-content: flex-start;

  & ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
  }

  & li {
    padding-right: 10px;
  }
`;

const Right = styled("div")`
  padding: 0 0 0 30px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Center = styled("div")`
  flex: 1;
`;

export class AppBar extends React.Component {
  public render() {
    return (
      <Bar>
        <div className="inner">
          <Left>
            <h1>
              <Link to={APP}>Tread</Link>
            </h1>
            <ul>
              <li>
                <Link to={PROJECTS}>Projects</Link>
              </li>
              <li>
                <Link to={AGENDA}>Agenda</Link>
              </li>
              <li>
                <Link to={JOURNAL}>Journal</Link>
              </li>
              <li>
                <Link to={BOOKMARKS}>Bookmarks</Link>
              </li>
              <li>
                <Link to={STOCKS}>Stocks</Link>
              </li>
              <li>
                <Link to={CONTACTS}>Contacts</Link>
              </li>
            </ul>
          </Left>

          <Center>
            <input style={{ width: "100%" }} type="text" placeholder="Search" />
          </Center>

          <Right>
            <button onClick={doSignOut}>Sign out</button>
          </Right>
        </div>
      </Bar>
    );
  }
}
