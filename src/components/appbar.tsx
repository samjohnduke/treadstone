import { Link } from "@reach/router";
import * as React from "react";
import { APP } from "src/constants/routes";
import { doSignOut } from "src/firebase/auth";
import styled from "src/styled";

const Bar = styled("div")`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background: #fff;
  color: ${p => p.theme.textColor};
  box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;

  & a {
    color: inherit;
  }

  & .inner {
    padding: 0 20px;
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
  align-items: center;
  justify-content: center;
`;

const ExitButton = styled("button")`
  height: 35px;
  margin: 0 0 0 20px;
  padding: 10px 20px;
  color: #fff;
  background: rgba(40, 50, 60, 1);
  border-radius: 5px;

  border: none;
  cursor: pointer;

  & .material-icons {
    font-size: 20px;
    line-height: 17.5px;
  }
`;

export class AppBar extends React.Component {
  public render() {
    return (
      <Bar>
        <div className="inner">
          <Left>
            <h1>
              <Link to={APP}>Treadstone</Link>
            </h1>
          </Left>

          <Center>
            <input
              style={{ display: "block", width: "500px", margin: "auto" }}
              type="text"
              placeholder="Search"
            />
          </Center>

          <Right>
            <ExitButton onClick={doSignOut}>
              <i className="material-icons">exit_to_app</i>
            </ExitButton>
          </Right>
        </div>
      </Bar>
    );
  }
}
