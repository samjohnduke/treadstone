import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { Container } from "src/design/authContainer";
import { Page } from "src/design/page";
import { ForgotPassword as Form } from "src/forms/forgotPassword";

export class ForgotPasswordPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Page>
        <Container>
          <Form />
        </Container>
      </Page>
    );
  }
}
