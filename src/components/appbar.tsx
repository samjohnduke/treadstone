import { Link } from "@reach/router";
import * as React from "react";
import { APP } from "src/constants/routes";
import { doSignOut } from "src/firebase/auth";
import styled from "src/styled";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuLink,
  MenuList
} from "@reach/menu-button";

import "@reach/menu-button/styles.css";
import { User } from "src/models/user";
import { withUser } from "src/providers/user";

const Bar = styled("div")`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background: ${p => p.theme.primaryColor};
  color: ${p => p.theme.primaryColorInverted};
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

  & button {
    background: #fff;
    color: #000;
  }

  & input {
    height: 35px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: ${p => p.theme.primaryColorInverted};
    transition: background 0.3s;
    outline: none;
    font-size: 1em;

    &::placeholder {
      color: ${p => p.theme.primaryColorInverted};
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      background: #fff;
      color: ${p => p.theme.textColor};
    }
  }
`;

const Left = styled("div")`
  flex: 0 150px;
  padding: 0 10px 0 0;
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
  flex: 0 150px;
  padding: 0 0 0 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  @media (max-width: 450px) {
    flex: 1;
  }
`;

const Center = styled("div")`
  flex: 1;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    display: none;
  }
`;

// const ExitButton = styled("button")`
//   height: 35px;
//   margin: 0 0 0 20px;
//   padding: 10px 20px;
//   color: #fff;
//   background: rgba(40, 50, 60, 1);
//   border-radius: 5px;

//   border: none;
//   cursor: pointer;

//   & .material-icons {
//     font-size: 20px;
//     line-height: 17.5px;
//   }
// `;

const StyledMenuList = styled(MenuList)`
  &[data-reach-menu-list] {
    font-size: 1em;
  }
`;

interface Props {
  user: User | undefined;
}
export class AppBarComponent extends React.Component<Props> {
  public render() {
    const { user } = this.props;
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
              style={{
                display: "block",
                margin: "auto",
                maxWidth: "500px",
                width: "100%"
              }}
              type="text"
              placeholder="Search"
            />
          </Center>

          <Right>
            <Menu style={{ zIndex: 10000 }}>
              <MenuButton
                style={{
                  background: "none",
                  border: "none",
                  borderRadius: 20
                }}
              >
                <img
                  src={user ? user.profileUrl : ""}
                  style={{ width: 35, height: 35, borderRadius: 20 }}
                />
              </MenuButton>
              <StyledMenuList>
                <MenuLink to="profile">My Profile</MenuLink>
                <MenuItem onSelect={doSignOut}>Logout</MenuItem>
              </StyledMenuList>
            </Menu>
          </Right>
        </div>
      </Bar>
    );
  }
}

export const AppBar = withUser<Props>(AppBarComponent);
