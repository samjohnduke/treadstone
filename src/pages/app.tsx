import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

import {
  // AGENDA,
  // BOOKMARKS,
  // CONTACTS,
  // FEEDS,
  JOURNAL
  // PROJECTS
  // STOCKS,
} from "src/constants/routes";
import styled from "src/styled";

const AppList = styled("ul")`
  list-style: none;
  display: grid;
  margin: 0;
  padding: 0;
  width: 100%;
  flex: 1;

  grid-template-columns: repeat(6, 100px);
  grid-gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  & li {
    & a {
      width: 100%;
      display: block;
      padding: 10px;
      color: #000;
      text-decoration: none;
      text-align: center;
      transition: color 0.2s;

      &:hover {
        color: ${p => p.theme.primaryColor};
      }

      & i {
        display: block;
        margin: 0 auto;
      }
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  padding: 10px 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  & > div {
    flex: 1;
  }
`;

const FullWidth = styled.div`
  width: 100%;
`;

export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    const date = new Date();
    const currentHour = date.getHours();

    let title = "Good morning";

    if (currentHour >= 12) {
      title = "Good afternoon";
    }

    if (currentHour >= 18) {
      title = "Good evening";
    }

    return (
      <AppPage>
        <FullWidth>
          <Row>
            <div>
              <h2 style={{ fontSize: "2em" }}>{title}</h2>
            </div>
          </Row>
          <Row>
            <div>
              <h3>Recent Apps</h3>
              <AppList>
                {/* <li>
                  <Link to={PROJECTS}>
                    <i className="material-icons">domain</i>
                    <span>Projects</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={AGENDA}>
                    <i className="material-icons">calendar_today</i>
                    <span>Agenda</span>
                  </Link>
                </li> */}
                <li>
                  <Link to={JOURNAL}>
                    <i className="material-icons">book</i>
                    <span>Journal</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to={FEEDS}>
                    <i className="material-icons">rss_feed</i>
                    <span>Reader</span>
                  </Link>
                </li> */}
              </AppList>
            </div>
          </Row>
          <Row>
            <div>
              <h3>Recent Activity</h3>
              <p>Nothing has happened recently.</p>
            </div>
          </Row>
        </FullWidth>
      </AppPage>
    );
  }
}
