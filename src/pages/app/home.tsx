import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AppPage } from "src/design/appPage";

import {
  AGENDA,
  // BOOKMARKS,
  // CONTACTS,
  FEEDS,
  JOURNAL,
  PROJECTS
  // STOCKS,
} from "src/constants/routes"
import styled from 'src/styled';

const AppList = styled('ul')`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  & li {
    padding: 10px 30px;
    
    &:first-of-type {
      padding: 10px 30px 10px 10px;
    }

    & a {
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
`

export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    const date = new Date();
    const currentHour = date.getHours();

    let title = "Good morning"

    if(currentHour >= 12) {
      title = "Good afternoon"
    }

    if(currentHour >= 18) {
      title = "Good evening"
    }

    return (
      <AppPage>
        <div style={{width: '100%'}}>
          <div style={{display: 'flex', flex: 1, padding: 10}}>
            <div style={{flex: '1 1 800px', maxWidth: 800, margin: '0 auto'}}>
              <h2>{title}</h2>
            </div>
          </div>
          <div style={{display: 'flex', flex: 1, padding: 10}}>
            <div style={{flex: '1 1 800px', maxWidth: 800, margin: '0 auto'}}>
              <h3>Recent Apps</h3>
              <AppList>
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
              </AppList>
            </div>
          </div>
        </div>
      </AppPage>
    );
  }
}
