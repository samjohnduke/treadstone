import { Link, RouteComponentProps } from "@reach/router";
import * as React from "react";
import { AUTHENTICATE, HOME } from "src/constants/routes";
import { Page } from "src/design/page";
import { doSignOut } from "src/firebase/auth";
import { withAuthorization } from "src/firebase/withAuthorisation";
import { UserProps } from "src/firebase/withUser";

import "src/firebase/firestore";

type Props = UserProps & RouteComponentProps;

export class Core extends React.Component {
  public cl(e: React.SyntheticEvent<HTMLElement>) {
    console.log(e);
  }

  public render() {
    return (
      <Page>
        <div>
          <h1>
            <Link to={HOME}>Tread</Link>
          </h1>

          <input type="text" />
          <a onClick={doSignOut}>Sign out</a>
        </div>
      </Page>
    );
  }
}

export const CorePage = withAuthorization<Props>(
  user => (user ? true : false),
  AUTHENTICATE
)(Core);
