import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Container } from 'src/design/authContainer';
import { FormAside } from 'src/design/formAside';
import { Page } from 'src/design/page';
import { Auth as Form } from 'src/forms/auth';


export class AuthPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Page>
        <Container>
          <Form />
          <FormAside />
        </Container>
      </Page>
    )
  }
}
