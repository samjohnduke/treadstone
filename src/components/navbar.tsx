import { Link } from "@reach/router";
import * as React from "react";
import * as Routes from "src/constants/routes";
import { doSignOut } from "src/firebase/auth";
import { withUser } from "src/firebase/withUser";
import styled from "src/styled";

const Nav = styled.div`
  flex: 0;
  margin: 0 auto;
  display: flex;
  background: #ffffff;
  padding: 0 20px;
  width: 100%;

  h1 {
    font-size: 1.6em;
    margin: 0;
    padding: 1em 0;
  }

  ul {
    display: flex;

    padding: 0;
    margin: 0;
    height: 100%;
    list-style: none;

    width: 100%;
    justify-content: flex-end;
  }

  li {
    flex: 0;
    display: flex;
    font-size: 1.2em;
    align-items: center;
    margin: 0;
    padding: 1.2em 0.5em;
  }

  a {
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const NavSec = styled.div`
  flex: 1;
  display: flex;
`;

export class NavbarUser extends React.Component<{ user?: firebase.User }> {
  public render() {
    return (
      <Nav>
        <NavSec>
          <h1>
            <Link to={Routes.HOME}>Treadstone</Link>
          </h1>
        </NavSec>
        <NavSec>
          <ul>
            <li>
              <Link to={Routes.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={Routes.PRICING}>Pricing</Link>
            </li>

            {this.props.user ? (
              <>
                <li>
                  <Link to={Routes.APP}>App</Link>
                </li>
                <li>
                  <a onClick={doSignOut}>
                    <i className="material-icons">exit_to_app</i>
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link to={Routes.AUTHENTICATE}>Login</Link>
              </li>
            )}
          </ul>
        </NavSec>
      </Nav>
    );
  }
}

export const Navbar = withUser(NavbarUser);
