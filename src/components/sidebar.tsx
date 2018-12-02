import { Link } from "@reach/router";
import * as React from "react";
import {
  AGENDA,
  APP,
  // BOOKMARKS,
  // CONTACTS,
  FEEDS,
  JOURNAL,
  PROJECTS
  // STOCKS,
} from "src/constants/routes";
import styled from "src/styled";

const Bar = styled("div")`
  flex: 0 1 80px;
  width: 80px;
  height: calc(100vh - 60px);
  background: ${p => p.theme.textColor};
  color: ${p => p.theme.backgroundColor};
  position: sticky;
  top: 60px;

  & ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  & a {
    color: ${p => p.theme.backgroundColor};
    text-decoration: none;
    width: 80px;
    padding: 10px;
    text-align: center;
    display: block;
  }
`;

export class Sidebar extends React.Component {
  public render() {
    return (
      <Bar>
        <ul>
          <li>
            <Link to={APP}>
              <i className="material-icons">dashboard</i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to={PROJECTS}>
              <i className="material-icons">domain</i>
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to={AGENDA}>
              <i className="material-icons">calendar_today</i>
              <span>Agenda</span>
            </Link>
          </li>
          <li>
            <Link to={JOURNAL}>
              <i className="material-icons">book</i>
              <span>Journal</span>
            </Link>
          </li>
          <li>
            <Link to={FEEDS}>
              <i className="material-icons">rss_feed</i>
              <span>Reader</span>
            </Link>
          </li>
          {/* <li>
                <Link to={BOOKMARKS}>Bookmarks</Link>
              </li>
              <li>
                <Link to={STOCKS}>Stocks</Link>
              </li>
              <li>
                <Link to={CONTACTS}>Contacts</Link>
              </li> */}
        </ul>
      </Bar>
    );
  }
}
