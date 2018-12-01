import { Link } from "@reach/router";
import * as React from "react";
import {
  AGENDA,
  // BOOKMARKS,
  // CONTACTS,
  FEEDS,
  JOURNAL,
  PROJECTS
  // STOCKS,
} from "src/constants/routes";

export class Sidebar extends React.Component {
  public render() {
    return (
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
          <Link to={FEEDS}>Reader</Link>
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
    );
  }
}
